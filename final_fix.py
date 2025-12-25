import os

file_path = 'src/pages/Index.tsx'
with open(file_path, 'r') as f:
    content = f.read()

# This replaces the checkout function with one that handles errors and logs data
new_checkout_logic = """
    const res = await fetch('/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    
    const session = await res.json();
    console.log("SERVER RESPONSE:", session);

    if (session.url) {
      console.log("Redirecting to URL:", session.url);
      window.location.href = session.url;
    } else if (session.id) {
      console.log("URL missing, trying ID fallback:", session.id);
      window.location.href = "https://checkout.stripe.com/pay/" + session.id;
    } else {
      console.error("No URL or ID in response:", session);
      alert("Error: Server did not return a valid Stripe session.");
    }
"""

# Use a simpler string replacement to avoid regex issues
if 'const res = await fetch' in content:
    import re
    # Find the block from 'const res = await fetch' to 'const session = await res.json();' 
    # and replace the logic following it.
    pattern = r'const res = await fetch.*?;.*?const session = await res\.json\(.*?\);(.*?)(?=catch|})'
    content = re.sub(pattern, new_checkout_logic, content, flags=re.DOTALL)
    
    with open(file_path, 'w') as f:
        f.write(content)
    print("Frontend logic hardened!")
else:
    print("Could not find fetch logic.")
