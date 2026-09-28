# GLOBAL SOCIAL

A modern multi-category dropshipping storefront built with HTML, CSS, and JavaScript.

## Features
- Multi-category storefront
- Product catalog and filters
- Shopping cart and checkout flow
- Order tracking search
- Admin dashboard to add/edit/delete products and update order status
- LocalStorage-based persistence for quick demos
- Ready for Firebase and Stripe extension in production

## Files
- `index.html` — storefront homepage
- `admin.html` — admin dashboard
- `styles.css` — styling for the full UI
- `script.js` — storefront and admin logic

## Run locally
Open `index.html` in a browser, or serve with a simple static server:

```bash
python3 -m http.server 8000
```

Then visit:
- `http://localhost:8000/`
- `http://localhost:8000/admin.html`

## Notes
This demo uses browser localStorage for product and order persistence so it works instantly without backend setup. For a live production version, you can replace the localStorage layer with Firebase Firestore or a backend API, and connect Stripe, bKash, or Nagad for real payment processing.
