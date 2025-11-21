# QR Code Setup Guide - Quick Start

## 🎯 How to Add Your Payment QR Code

### Option 1: Quick Update (Recommended)

**Step 1: Get Your QR Code Image**
1. Open your UPI app (Google Pay, PhonePe, Paytm, etc.)
2. Go to "Receive Money" or "My QR Code"
3. Download or screenshot your QR code
4. Save as PNG or JPG

**Step 2: Upload to Image Hosting**

**Free Options:**
- **ImgBB** (https://imgbb.com) - No account needed
- **Imgur** (https://imgur.com) - Free hosting
- **Cloudinary** (https://cloudinary.com) - Free tier available

**Upload Process:**
1. Go to image hosting site
2. Upload your QR code image
3. Copy the direct image URL
4. Make sure it ends with .png or .jpg

**Step 3: Update the Code**

Open `/workspace/app-7p9lig9vkiyp/src/pages/Cart.tsx`

Find this line (around line 187):
```tsx
src="https://miaoda-site-img.s3cdn.medo.dev/images/payment-qr-placeholder.png"
```

Replace with your QR code URL:
```tsx
src="YOUR_QR_CODE_URL_HERE"
```

**Example:**
```tsx
src="https://i.imgur.com/abc123.png"
```

**Step 4: Test**
1. Save the file
2. Go to cart page
3. Click "QR Payment" tab
4. Verify QR code displays correctly
5. Test scanning with your phone

---

## 📱 QR Code Best Practices

### Image Requirements

**Size:**
- Minimum: 192x192 pixels
- Recommended: 512x512 pixels or higher
- Maximum: 1024x1024 pixels

**Format:**
- PNG (recommended for quality)
- JPG (acceptable)
- Avoid: GIF, WebP, SVG

**Quality:**
- High resolution (300 DPI)
- Clear and sharp
- No blur or distortion
- White or light background

### Testing Your QR Code

**Test With:**
- ✅ Google Pay
- ✅ PhonePe
- ✅ Paytm
- ✅ BHIM UPI
- ✅ Any other UPI app

**Verify:**
- ✅ Scans quickly
- ✅ Shows correct merchant name
- ✅ Amount can be entered
- ✅ Payment completes successfully

---

## 🔧 Alternative: Use Existing QR Code

If you already have a QR code image online:

**Step 1: Get the URL**
- Right-click on your QR code image
- Select "Copy image address" or "Copy image URL"
- Make sure it's a direct link to the image

**Step 2: Update Cart.tsx**
```tsx
<img
  src="YOUR_DIRECT_IMAGE_URL"
  alt="Payment QR Code"
  className="w-48 h-48 mx-auto"
/>
```

---

## 🎨 Customization Options

### Change QR Code Size

**Current Size:** 192x192px (w-48 h-48)

**Make Larger:**
```tsx
className="w-64 h-64 mx-auto"  // 256x256px
```

**Make Smaller:**
```tsx
className="w-40 h-40 mx-auto"  // 160x160px
```

### Change Background Color

**Current:** White background with padding

**Modify:**
```tsx
<div className="bg-white p-4 rounded-lg inline-block mb-3">
```

**Options:**
- `bg-white` - White
- `bg-gray-50` - Light gray
- `bg-blue-50` - Light blue
- `bg-muted` - Theme muted color

### Update Instructions

**Location:** Lines 195-205 in Cart.tsx

**Current Text:**
```tsx
<p className="text-xs text-muted-foreground mb-3">
  Scan this QR code with your UPI app or payment app to complete the payment
</p>
```

**Customize:**
```tsx
<p className="text-xs text-muted-foreground mb-3">
  Your custom instructions here
</p>
```

---

## 📞 Update Contact Information

**Current Contact:** 085938 52223

**To Change:**

Find line 203:
```tsx
<li>Contact us at <a href="tel:08593852223" className="text-primary hover:underline">085938 52223</a></li>
```

Update both places:
```tsx
<li>Contact us at <a href="tel:YOUR_PHONE_NUMBER" className="text-primary hover:underline">YOUR_DISPLAY_NUMBER</a></li>
```

**Example:**
```tsx
<li>Contact us at <a href="tel:+919876543210" className="text-primary hover:underline">+91 98765 43210</a></li>
```

---

## 🚀 Quick Commands

### After Making Changes

**1. Check for Errors:**
```bash
cd /workspace/app-7p9lig9vkiyp
npm run lint
```

**2. View Changes:**
- Navigate to `/cart` page
- Add items to cart
- Click "QR Payment" tab
- Verify QR code displays

---

## ✅ Verification Checklist

Before going live:

- [ ] QR code image uploaded
- [ ] Direct URL copied
- [ ] Cart.tsx updated with URL
- [ ] File saved
- [ ] Lint check passed
- [ ] QR code displays on cart page
- [ ] QR code scans correctly
- [ ] Contact number is correct
- [ ] Instructions are clear
- [ ] Mobile view looks good
- [ ] Desktop view looks good

---

## 🎯 Common Issues & Solutions

### Issue 1: QR Code Not Displaying

**Possible Causes:**
- Wrong URL format
- Image not publicly accessible
- CORS issues
- Broken link

**Solutions:**
1. Verify URL is direct image link
2. Check URL ends with .png or .jpg
3. Test URL in browser (should show only image)
4. Use different image hosting service

### Issue 2: QR Code Too Small/Large

**Solution:**
Adjust className:
```tsx
// Smaller
className="w-32 h-32 mx-auto"

// Larger
className="w-64 h-64 mx-auto"
```

### Issue 3: QR Code Not Scanning

**Possible Causes:**
- Low resolution image
- Damaged QR code
- Wrong QR code type

**Solutions:**
1. Use higher resolution image
2. Generate new QR code
3. Test with multiple UPI apps
4. Ensure QR code is for UPI payment

---

## 📝 Example Implementation

### Complete Code Block

```tsx
<TabsContent value="qr" className="space-y-4">
  <div className="bg-muted/30 rounded-lg p-4 text-center">
    <div className="bg-white p-4 rounded-lg inline-block mb-3">
      <img
        src="https://your-image-host.com/your-qr-code.png"
        alt="Payment QR Code"
        className="w-48 h-48 mx-auto"
        onError={(e) => {
          e.currentTarget.src = "https://via.placeholder.com/192x192?text=QR+Code";
        }}
      />
    </div>
    <p className="text-sm font-semibold mb-2">Scan to Pay</p>
    <p className="text-xs text-muted-foreground mb-3">
      Scan this QR code with your UPI app to complete the payment
    </p>
    <div className="bg-background border rounded-lg p-3 text-left space-y-2">
      <p className="text-xs font-semibold">After Payment:</p>
      <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
        <li>Take a screenshot of payment confirmation</li>
        <li>Contact us at <a href="tel:YOUR_PHONE" className="text-primary hover:underline">YOUR_NUMBER</a></li>
        <li>Share your order details and payment proof</li>
      </ol>
    </div>
  </div>
  <Button
    onClick={() => {
      toast.success("Please complete payment via QR code and contact us with payment proof");
    }}
    variant="secondary"
    className="w-full"
    size="lg"
  >
    I've Made the Payment
  </Button>
</TabsContent>
```

---

## 🎨 Visual Preview

### What Customers See

```
┌─────────────────────────────────────┐
│     Order Summary                   │
├─────────────────────────────────────┤
│  Subtotal:              $150.00     │
│  Shipping:              TBD         │
│  ─────────────────────────────      │
│  Total:                 $150.00     │
│                                     │
│  [💳 Online] [📱 QR Payment]        │
│                                     │
│  ┌─────────────────────────────┐   │
│  │                             │   │
│  │    ┌─────────────────┐      │   │
│  │    │                 │      │   │
│  │    │   [QR CODE]     │      │   │
│  │    │                 │      │   │
│  │    └─────────────────┘      │   │
│  │                             │   │
│  │      Scan to Pay            │   │
│  │                             │   │
│  │  Scan with your UPI app     │   │
│  │                             │   │
│  │  After Payment:             │   │
│  │  1. Take screenshot         │   │
│  │  2. Contact: 085938 52223   │   │
│  │  3. Share payment proof     │   │
│  │                             │   │
│  └─────────────────────────────┘   │
│                                     │
│  [I've Made the Payment]            │
│                                     │
└─────────────────────────────────────┘
```

---

## 💡 Pro Tips

### Tip 1: Multiple QR Codes
If you want different QR codes for different scenarios:
- Create separate QR codes for different amounts
- Use conditional rendering based on cart total
- Switch QR codes based on payment method

### Tip 2: Dynamic QR Generation
For advanced users:
- Use UPI deep links to generate dynamic QR codes
- Include order ID in payment reference
- Automate payment verification

### Tip 3: Backup QR Code
Always keep a backup:
- Save QR code image locally
- Keep multiple hosting locations
- Have fallback URL ready

---

## 📞 Need Help?

### Technical Support

**QR Code Generation:**
- Contact your bank for business QR code
- Use UPI app's merchant features
- Payment gateway providers

**Image Hosting:**
- ImgBB support
- Imgur help center
- Cloudinary documentation

**Code Issues:**
- Check syntax errors
- Verify file paths
- Test in different browsers

---

## 🎯 Quick Reference

### File Location
```
/workspace/app-7p9lig9vkiyp/src/pages/Cart.tsx
```

### Line to Update
```
Line ~187: src="YOUR_QR_CODE_URL"
```

### Contact Line
```
Line ~203: Contact number
```

### Test URL
```
http://your-website.com/cart
```

---

**Status:** ✅ Ready to customize  
**Difficulty:** ⭐ Easy (just update URL)  
**Time Required:** 5-10 minutes  
**Technical Knowledge:** Basic (copy/paste)

---

## ✨ Final Steps

1. ✅ Generate/download your QR code
2. ✅ Upload to image hosting
3. ✅ Copy direct image URL
4. ✅ Update Cart.tsx line 187
5. ✅ Update contact number if needed
6. ✅ Save file
7. ✅ Run `npm run lint`
8. ✅ Test on cart page
9. ✅ Scan with phone to verify
10. ✅ Go live!

---

**Last Updated:** 2025-11-21  
**Version:** 1.0  
**Difficulty:** Beginner-friendly
