# Google Search Console Setup Guide for durocap.com

## 🎯 Complete Step-by-Step Guide to Get durocap.com Indexed on Google

---

## ✅ COMPLETED: Technical SEO Implementation

The following has already been implemented in your website:

### 1. SEO Meta Tags ✓
- **Title**: Durocap Roofing Solutions | Roofing Sheets & Accessories Kerala
- **Description**: Trusted roofing sheet suppliers in Kerala...
- **Keywords**: Roofing Kerala, Roofing sheets, Metal roofing, Durocap...
- **Open Graph Tags**: For Facebook sharing
- **Twitter Card Tags**: For Twitter sharing
- **Geographic Tags**: Kerala location targeting

### 2. robots.txt ✓
- Location: `https://durocap.com/robots.txt`
- Allows all search engines to crawl
- Points to sitemap.xml

### 3. sitemap.xml ✓
- Location: `https://durocap.com/sitemap.xml`
- Contains all important pages with priorities
- Updated with proper change frequencies

### 4. Structured Data (JSON-LD) ✓
- Organization schema
- LocalBusiness schema
- Contact information
- Geographic coordinates
- Business hours

---

## 📋 YOUR ACTION ITEMS

Follow these steps in order to get your site indexed on Google:

---

## STEP 1: Verify Your Site Files Are Live

After your site is deployed, verify these URLs work:

1. **Main site**: https://durocap.com
2. **Robots.txt**: https://durocap.com/robots.txt
3. **Sitemap**: https://durocap.com/sitemap.xml

Open each URL in your browser to confirm they load correctly.

---

## STEP 2: Add Your Site to Google Search Console

### Option A: Domain Property (RECOMMENDED)

This verifies both www and non-www versions automatically.

**Steps:**

1. Go to: https://search.google.com/search-console
2. Click **"Add Property"**
3. Select **"Domain"** (not URL prefix)
4. Enter: `durocap.com` (without https:// or www)
5. Click **Continue**

Google will show you a **TXT record** to add to your DNS.

**Example TXT record:**
```
google-site-verification=abc123xyz456...
```

---

## STEP 3: Add TXT Record to GoDaddy DNS

**In GoDaddy:**

1. Login to GoDaddy: https://dcc.godaddy.com/
2. Go to **My Products** → **Domains**
3. Find `durocap.com` and click **DNS** (or **Manage DNS**)
4. Scroll to **Records** section
5. Click **Add** (or **Add Record**)
6. Fill in:
   - **Type**: TXT
   - **Name**: @ (or leave blank if @ is default)
   - **Value**: [Paste the TXT value from Google Search Console]
   - **TTL**: 1 Hour (or Default)
7. Click **Save**

**Wait 5-10 minutes** for DNS propagation.

---

## STEP 4: Verify in Google Search Console

1. Go back to Google Search Console
2. Click **"Verify"**
3. If successful, you'll see: ✅ "Ownership verified"

**If verification fails:**
- Wait another 10 minutes (DNS can take time)
- Double-check the TXT record is exactly as Google provided
- Ensure the Name/Host field is `@`
- Try clicking Verify again

---

## STEP 5: Submit Your Sitemap

Once verified:

1. In Google Search Console, go to **Sitemaps** (left menu)
2. Under "Add a new sitemap", enter:
   ```
   sitemap.xml
   ```
3. Click **Submit**

You should see: ✅ "Success" status

---

## STEP 6: Request Indexing for Key Pages

Speed up indexing by manually requesting it:

1. In Search Console, go to **URL Inspection** (left menu)
2. Enter each URL and click **Request Indexing**:
   - `https://durocap.com/`
   - `https://durocap.com/about`
   - `https://durocap.com/products`
   - `https://durocap.com/services`
   - `https://durocap.com/contact`

This tells Google to crawl these pages immediately.

---

## STEP 7: Monitor Indexing Progress

### Check Coverage

1. Go to **Pages** (or **Coverage**) in Search Console
2. Wait 24-48 hours
3. You should see pages appearing under "Indexed"

### Check Live URL

1. Go to **URL Inspection**
2. Enter: `https://durocap.com/`
3. Click **Test Live URL**
4. Should show: "URL is available to Google"

---

## 📊 Expected Timeline

| Action | Timeline |
|--------|----------|
| DNS TXT verification | 5-30 minutes |
| First crawl after sitemap submission | 1-24 hours |
| Pages appearing in Search Console | 1-3 days |
| Pages appearing in Google search results | 3-7 days |
| Full indexing of all pages | 1-2 weeks |
| Ranking improvements | 2-8 weeks |

---

## 🔍 Verify Your SEO Implementation

### Test Your Meta Tags

1. Go to: https://www.opengraph.xyz/
2. Enter: `https://durocap.com`
3. Check that title, description, and image appear correctly

### Test Structured Data

1. Go to: https://search.google.com/test/rich-results
2. Enter: `https://durocap.com`
3. Should show: ✅ "Valid" with Organization and LocalBusiness schemas

### Test Mobile-Friendliness

1. Go to: https://search.google.com/test/mobile-friendly
2. Enter: `https://durocap.com`
3. Should show: ✅ "Page is mobile-friendly"

---

## 🚀 BONUS: Additional SEO Improvements

### 1. Google Business Profile (Local SEO)

Create a Google Business Profile for local search visibility:

1. Go to: https://www.google.com/business/
2. Click **"Manage now"**
3. Enter business details:
   - **Business name**: Durocap Roofing Solutions
   - **Category**: Roofing contractor
   - **Address**: Near IOC Gas Plant, Kolayil, Parippally P.O, Kollam, Kerala 691574
   - **Phone**: +91-85938-52223
   - **Website**: https://durocap.com
4. Verify your business (Google will send a postcard with verification code)

**Benefits:**
- Appear in Google Maps
- Show in local search results
- Display business hours, photos, reviews

### 2. Google Analytics 4

Track your website traffic:

1. Go to: https://analytics.google.com/
2. Create a new property for `durocap.com`
3. Get your Measurement ID (G-XXXXXXXXXX)
4. Add to your website (contact your developer)

### 3. Create More Content Pages

Add these pages to improve SEO:

- **Blog/News**: Regular articles about roofing tips
- **FAQ**: Common roofing questions
- **Gallery**: Project photos with descriptions
- **Testimonials**: Customer reviews
- **Service Areas**: List cities you serve in Kerala

Each page should have:
- Unique title (50-60 characters)
- Unique description (150-160 characters)
- 300+ words of original content
- Relevant keywords naturally included

---

## 🎯 SEO Checklist

Use this checklist to track your progress:

### Technical SEO ✅
- [x] Meta tags added (title, description, keywords)
- [x] robots.txt created and accessible
- [x] sitemap.xml created and accessible
- [x] Structured data (JSON-LD) added
- [x] Canonical URLs set
- [x] Open Graph tags added
- [x] Twitter Card tags added

### Google Search Console
- [ ] Site added to Search Console
- [ ] TXT record added to GoDaddy DNS
- [ ] Domain ownership verified
- [ ] Sitemap submitted
- [ ] Key pages requested for indexing
- [ ] No crawl errors showing

### Content & Keywords
- [x] Home page optimized
- [x] About page optimized
- [x] Products page optimized
- [x] Services page optimized
- [x] Contact page optimized
- [ ] Additional content pages created (optional)

### Local SEO (Optional)
- [ ] Google Business Profile created
- [ ] Business verified on Google Maps
- [ ] Customer reviews requested

### Analytics (Optional)
- [ ] Google Analytics 4 set up
- [ ] Search Console linked to Analytics

---

## 🆘 Troubleshooting

### Issue: "Verification failed"
**Solution:**
- Wait 15-30 minutes for DNS propagation
- Check TXT record is exactly as provided by Google
- Ensure Name/Host is `@` (not blank or www)
- Clear your browser cache and try again

### Issue: "Sitemap couldn't be read"
**Solution:**
- Verify sitemap.xml is accessible at https://durocap.com/sitemap.xml
- Check XML syntax is valid
- Ensure file is published (not in draft)

### Issue: "URL is not on Google"
**Solution:**
- This is normal for new sites
- Wait 3-7 days after submitting sitemap
- Request indexing via URL Inspection tool
- Ensure robots.txt allows crawling

### Issue: "Page with redirect"
**Solution:**
- Ensure your site redirects HTTP to HTTPS
- Ensure www redirects to non-www (or vice versa)
- Update sitemap URLs to match final destination

### Issue: "Mobile usability errors"
**Solution:**
- Your site is already mobile-responsive
- Test at: https://search.google.com/test/mobile-friendly
- Fix any reported issues

---

## 📞 Need Help?

If you encounter issues:

1. **Search Console Help**: https://support.google.com/webmasters
2. **GoDaddy DNS Support**: https://www.godaddy.com/help
3. **Test Your Site**: Use Google's testing tools listed above

---

## 📈 Monitoring Your SEO Performance

### Weekly Checks (First Month)

1. **Search Console → Pages**
   - Check number of indexed pages
   - Look for any errors

2. **Search Console → Performance**
   - Monitor impressions (how often you appear in search)
   - Track clicks (how many people visit from search)
   - See which queries bring traffic

3. **Manual Search Test**
   - Search: `site:durocap.com` on Google
   - Should show all your indexed pages

### Monthly Checks (Ongoing)

1. **Rankings**
   - Search for your target keywords
   - Track your position in results

2. **Competitors**
   - Search for "roofing Kerala"
   - See who ranks above you
   - Analyze their content

3. **Content Updates**
   - Add new products/services
   - Update sitemap.xml lastmod dates
   - Create blog posts or news

---

## 🎉 Success Indicators

You'll know your SEO is working when:

✅ **Week 1**: Site verified in Search Console
✅ **Week 1-2**: Pages showing as "Indexed" in Search Console
✅ **Week 2-3**: Site appears when searching `site:durocap.com`
✅ **Week 3-4**: Site appears for brand searches (Durocap Roofing)
✅ **Month 2-3**: Site appears for product searches (roofing sheets Kerala)
✅ **Month 3-6**: Ranking improves for competitive keywords
✅ **Month 6+**: Consistent organic traffic from Google

---

## 📝 Quick Reference: Copy-Paste Values

### For GoDaddy DNS (TXT Record)
```
Type: TXT
Name: @
Value: [Paste from Google Search Console]
TTL: 1 Hour
```

### For Search Console (Sitemap)
```
sitemap.xml
```

### For URL Inspection (Request Indexing)
```
https://durocap.com/
https://durocap.com/about
https://durocap.com/products
https://durocap.com/services
https://durocap.com/contact
https://durocap.com/projects
```

---

## 🎯 Your Next Steps (In Order)

1. ✅ **Deploy your website** (if not already live)
2. ✅ **Verify files are accessible** (robots.txt, sitemap.xml)
3. 🔲 **Add site to Google Search Console** (Domain property)
4. 🔲 **Add TXT record to GoDaddy DNS**
5. 🔲 **Verify ownership in Search Console**
6. 🔲 **Submit sitemap.xml**
7. 🔲 **Request indexing for key pages**
8. 🔲 **Wait 3-7 days and monitor progress**
9. 🔲 **Create Google Business Profile** (optional but recommended)
10. 🔲 **Set up Google Analytics** (optional)

---

**Implementation Date**: 2025-11-21
**Status**: ✅ Technical SEO Complete - Ready for Search Console Setup
**Next Action**: Follow Step 2 to add your site to Google Search Console

---

**Questions? Need help with any step?**

Let me know which step you're on and I'll provide detailed guidance!
