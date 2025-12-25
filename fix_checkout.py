import os

file_path = 'src/pages/Index.tsx'
with open(file_path, 'r') as f:
    content = f.read()

# This looks for the fetch call and ensures it redirects to the URL provided by the server
old_code = """const res = await fetch('/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const session = await res.json();
    if (session.id) {
      window.location.href = session.url;
    }"""

# We'll use a more flexible replacement to ensure it catches your current structure
if 'const res = await fetch' in content:
    # This replaces the logic to ensure window.location.href = session.url is present
    import re
    pattern = r'const res = await fetch\(.*?\);.*?const session = await res\.json\(.*?\);'
    replacement = """const res = await fetch('/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const session = await res.json();
    if (session.url) {
      window.location.href = session.url;
    } else if (session.id) {
      // Fallback for older Stripe integrations
      console.log("Redirecting via session ID");
    }"""
    
    # Simple direct overwrite for the function area to be certain
    # This is a safer approach for your specific file
    with open(file_path, 'w') as f:
        # If the complex regex is too risky, we just ensure the redirect is there
        f.write(content.replace('window.location.href = session.url;', 'window.location.href = session.url;').replace('const session = await res.json();', 'const session = await res.json(); if (session.url) { window.location.href = session.url; }'))

print("File updated with redirect logic!")
