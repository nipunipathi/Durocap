# SEO Quick Reference Card - durocap.com

## 🚀 Quick Start: 3 Essential Steps

### STEP 1: Add to Google Search Console
1. Go to: https://search.google.com/search-console
2. Click "Add Property" → Select "Domain"
3. Enter: `durocap.com`
4. Copy the TXT record Google provides

### STEP 2: Add TXT Record to GoDaddy
1. Login: https://dcc.godaddy.com/
2. Go to: My Products → Domains → durocap.com → DNS
3. Click "Add Record"
4. **Type**: TXT | **Name**: @ | **Value**: [Paste from Google]
5. Save and wait 10 minutes

### STEP 3: Verify & Submit Sitemap
1. Back in Search Console, click "Verify"
2. Go to Sitemaps → Enter: `sitemap.xml` → Submit
3. Go to URL Inspection → Enter: `https://durocap.com/` → Request Indexing

---

## 📋 Copy-Paste Values

### GoDaddy DNS Record
```
Type: TXT
Name: @
Value: [Get from Google Search Console]
TTL: 1 Hour
```

### Search Console Sitemap
```
sitemap.xml
```

### URLs to Request Indexing
```
https://durocap.com/
https://durocap.com/about
https://durocap.com/products
https://durocap.com/services
https://durocap.com/contact
```

---

## ✅ Verify Your Implementation

### Check Files Are Live
- [ ] https://durocap.com (main site)
- [ ] https://durocap.com/robots.txt
- [ ] https://durocap.com/sitemap.xml

### Test Your SEO
- **Meta Tags**: https://www.opengraph.xyz/
- **Structured Data**: https://search.google.com/test/rich-results
- **Mobile-Friendly**: https://search.google.com/test/mobile-friendly

---

## 📊 Timeline Expectations

| Milestone | Time |
|-----------|------|
| DNS verification | 5-30 min |
| First Google crawl | 1-24 hours |
| Pages indexed | 1-3 days |
| Appear in search | 3-7 days |
| Ranking improvements | 2-8 weeks |

---

## 🎯 SEO Checklist

### Technical (Already Done ✅)
- [x] Meta tags (title, description, keywords)
- [x] robots.txt created
- [x] sitemap.xml created
- [x] Structured data (JSON-LD)
- [x] Open Graph tags
- [x] Twitter Card tags

### Your Action Items
- [ ] Add to Google Search Console
- [ ] Add TXT record to GoDaddy
- [ ] Verify ownership
- [ ] Submit sitemap
- [ ] Request indexing for key pages

---

## 🆘 Quick Troubleshooting

**Verification Failed?**
→ Wait 15 minutes, check TXT record is exact, try again

**Sitemap Error?**
→ Verify https://durocap.com/sitemap.xml loads in browser

**Not Indexed Yet?**
→ Normal for new sites, wait 3-7 days after sitemap submission

---

## 📞 Important Links

- **Google Search Console**: https://search.google.com/search-console
- **GoDaddy DNS**: https://dcc.godaddy.com/
- **Test Meta Tags**: https://www.opengraph.xyz/
- **Test Structured Data**: https://search.google.com/test/rich-results
- **Test Mobile**: https://search.google.com/test/mobile-friendly

---

## 🎉 Success Indicators

✅ Search Console shows "Ownership verified"
✅ Sitemap shows "Success" status
✅ Pages appear in "Indexed" section
✅ `site:durocap.com` shows results on Google
✅ Brand searches (Durocap Roofing) show your site

---

**Need detailed instructions?** See: `GOOGLE_SEARCH_CONSOLE_SETUP.md`

**Status**: ✅ Technical SEO Complete - Ready for Search Console Setup
