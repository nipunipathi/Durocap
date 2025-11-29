import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import Razorpay from "npm:razorpay@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const razorpayKeyId = Deno.env.get("RAZORPAY_KEY_ID");
    const razorpayKeySecret = Deno.env.get("RAZORPAY_KEY_SECRET");

    if (!razorpayKeyId || !razorpayKeySecret) {
      throw new Error("Razorpay credentials not configured");
    }

    const { amount, currency, orderId, customerEmail, customerName } = await req.json();

    if (!amount || !currency || !orderId) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: amount, currency, orderId" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const razorpay = new Razorpay({
      key_id: razorpayKeyId,
      key_secret: razorpayKeySecret,
    });

    const amountInPaise = Math.round(amount * 100);

    const razorpayOrder = await razorpay.orders.create({
      amount: amountInPaise,
      currency: currency,
      receipt: orderId,
      notes: {
        customer_email: customerEmail || "",
        customer_name: customerName || "",
        order_id: orderId,
      },
    });

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { error: updateError } = await supabase
      .from("orders")
      .update({
        razorpay_order_id: razorpayOrder.id,
        payment_method: "razorpay",
      })
      .eq("id", orderId);

    if (updateError) {
      console.error("Error updating order with Razorpay order ID:", updateError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        razorpayOrder: {
          id: razorpayOrder.id,
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency,
          receipt: razorpayOrder.receipt,
        },
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to create Razorpay order" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
