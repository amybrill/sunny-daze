npm install
sudo apt install nodejs npm
sudo rm /var/lib/apt/lists/lock
sudo rm /var/cache/apt/archives/lock
sudo rm /var/lib/dpkg/lock-frontend
sudo killall apt apt-get
sudo rm /var/lib/apt/lists/lock
sudo rm /var/cache/apt/archives/lock
sudo rm /var/lib/dpkg/lock-frontend
npm run dev
node server .js
npm run dev
node server .js
curl -X POST http://100.115.92.205:8080/create-checkout-session
https://buy.stripe.com/test_00w4gzgqg8b327oaI7c7u02
node server.js
require('dotenv').config(); // This must be line 1
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // This uses the key from .env
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
require('dotenv').config(); // This must be line 1
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // This uses the key from .env
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
code .
nano server.js
cat << 'EOF' > server.js
require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'Test Product' },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://100.115.92.205:8081',
      cancel_url: 'http://100.115.92.205:8081',
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(8080, () => console.log('Stripe Server running on port 8080'));
EOF

cat << 'EOF' > server.js
require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'Test Product' },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://100.115.92.205:8081',
      cancel_url: 'http://100.115.92.205:8081',
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(8080, () => console.log('Stripe Server running on port 8080'));
EOF

brillamy95@penguin:~$ cat << 'EOF' > server.js
require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'Test Product' },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
EOF.listen(8080, () => console.log('Stripe Server running on port 8080'));
brillamy95@penguin:~$ cat << 'EOF' > server.js
require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'Test Product' },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
EOF.listen(8080, () => console.log('Stripe Server running on port 8080'));
brillamy95@penguin:~$ 

brillamy95@penguin:~$ cat << 'EOF' > server.js
require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'Test Product' },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
EOF.listen(8080, () => console.log('Stripe Server running on port 8080'));
brillamy95@penguin:~$ cat << 'EOF' > server.js
require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'Test Product' },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
EOF.listen(8080, () => console.log('Stripe Server running on port 8080'));
brillamy95@penguin:~$ 

echo "STRIPE_SECRET_KEY=sk_test_YOUR_NEW_KEY_HERE" > .env
cat << 'EOF' > server.js
require('dotenv').config();
const express = require('express'), cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const app = express();
app.use(cors()); app.use(express.json());
app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: { currency: 'usd', product_data: { name: 'Test Product' }, unit_amount: 2000 },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'http://100.115.92.205:8081',
      cancel_url: 'http://100.115.92.205:8081',
    });
    res.json({ url: session.url });
  } catch (e) { res.status(500).json({ error: e.message }); }
});
app.listen(8080, () => console.log('Stripe Server running on port 8080'));
EOF

node server.js
mv server.js server.cjs
node server.cjs
npm run dev -- --host
npx vite --port 8081 --host 0.0.0.0
// Change 'localhost' to your Network IP
const response = await fetch('http://100.115.92.205:8080/create-checkout-session', {
});
ls
grep -rl "localhost:8080" src/ | xargs sed -i 's/localhost:8080/100.115.92.205:8080/g'
ls src
grep -r "fetch" src/
grep -r "axios" src/
grep -r "8080" src/
grep -rEi "checkout|session" src/
grep -C 5 "Direct redirect to Stripe checkout" src/components/AppLayout.tsx
sed -i "s|const stripeUrl = 'https://buy.stripe.com/.*';|const response = await fetch('http://100.115.92.205:8080/create-checkout-session', { method: 'POST' }); const data = await response.json(); window.location.href = data.url; return;|" src/components/AppLayout.tsx
npm run dev -- --host
sed -i "s|const response = await fetch.*return;|fetch('http://100.115.92.205:8080/create-checkout-session', { method: 'POST' }).then(res => res.json()).then(data => { window.location.href = data.url; }).catch(err => console.error(err));|" src/components/AppLayout.tsx
sed -i "s/app.listen(8080, () =>/app.listen(8080, '0.0.0.0', () =>/" server.cjs
node server.cjs
npm install express stripe dotenv cors --no-package-lock --prefer-offline
ls
echo "STRIPE_SECRET_KEY=sk_test_51..." > .env
cat <<EOF > server.js
require('dotenv').config();
const express = require('express');
const app = express();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: 'Purchase' },
          unit_amount: 2000,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'http://localhost:5173/success',
      cancel_url: 'http://localhost:5173/cancel',
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(8080, () => console.log('Stripe Server running on port 8080'));
EOF

npm install express stripe dotenv cors --no-package-lock
ls -a
node server.js
cat <<EOF > server.js
import dotenv from 'dotenv';
import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';

dotenv.config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(express.json());
app.use(cors());

app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: 'Purchase' },
          unit_amount: 2000,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'http://localhost:5173/success',
      cancel_url: 'http://localhost:5173/cancel',
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(8080, () => console.log('Stripe Server running on port 8080'));
EOF

cat <<EOF > server.js
import dotenv from 'dotenv';
import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';

dotenv.config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(express.json());
app.use(cors());

app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: 'Purchase' },
          unit_amount: 2000,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'http://localhost:5173/success',
      cancel_url: 'http://localhost:5173/cancel',
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(8080, () => console.log('Stripe Server running on port 8080'));
EOF

rm server.js
cat <<EOF > server.js
import dotenv from 'dotenv';
import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';

dotenv.config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(express.json());
app.use(cors());

app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: 'Purchase' },
          unit_amount: 2000,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'http://localhost:5173/success',
      cancel_url: 'http://localhost:5173/cancel',
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(8080, () => console.log('Stripe Server running on port 8080'));
EOF

echo "import dotenv from 'dotenv'; import express from 'express'; import Stripe from 'stripe'; import cors from 'cors'; dotenv.config(); const app = express(); const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); app.use(express.json()); app.use(cors());" > server.js
echo "app.post('/create-checkout-session', async (req, res) => { try { const session = await stripe.checkout.sessions.create({ payment_method_types: ['card'], line_items: [{ price_data: { currency: 'usd', product_data: { name: 'Purchase' }, unit_amount: 2000, }, quantity: 1, }], mode: 'payment', success_url: 'http://localhost:5173/success', cancel_url: 'http://localhost:5173/cancel', }); res.json({ url: session.url }); } catch (e) { res.status(500).json({ error: e.message }); } });" >> server.js
echo "app.listen(8080, () => console.log('Stripe Server running on port 8080'));" >> server.js
node server.js
sudo kill -9 $(sudo lsof -t -i:8080,8081)
pkill -9 node
node server.js
node server.cjs
sed -i "s/app.listen(8080, () =>/app.listen(8080, '0.0.0.0', () =>/" server.cjs
node server.cjs
sed -i "s/app.listen(8080, () =>/app.listen(8080, '0.0.0.0', () =>/" server.cjs
node server.cjs
# Update your server to listen on all interfaces (0.0.0.0)
sed -i "s/app.listen(8080, () =>/app.listen(8080, '0.0.0.0', () =>/" server.cjs
node server.cjs
npm run dev -- --host
$ node server.cjs
[dotenv@17.2.3] injecting env (1) from .env -- tip: 📡 add observability to secrets: https://dotenvx.com/ops
Stripe Server running on port 8080
sed -i "s|const stripeUrl = '.*';|const stripeUrl = 'http://100.115.92.205:8080/create-checkout-session';|" src/components/AppLayout.tsx && sed -i "s|window.open(stripeUrl, '_blank');|fetch(stripeUrl, { method: 'POST' }).then(res => res.json()).then(data => { window.location.href = data.url; }).catch(err => console.error(err));|" src/components/AppLayout.tsx
brillamy95@penguin:~$ sed -i "s|const stripeUrl = '.*';|const stripeUrl = 'http://100.115.92.205:8080/create-checkout-session';|" src/components/AppLayout.tsx && sed -i "s|window.open(stripeUrl, '_blank');|fetch(stripeUrl, { method: 'POST' }).then(res => res.json()).then(data => { window.location.href = data.url; }).catch(err => console.error(err));|" src/components/AppLayout.tsx
brillamy95@penguin:~$ 
node server.cjs
cat << 'EOF' > server.cjs
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: 'Lottery Ticket' },
          unit_amount: 100,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'http://100.115.92.205:8081/success',
      cancel_url: 'http://100.115.92.205:8081/cancel',
    });
    console.log('Session created:', session.id);
    res.json({ url: session.url });
  } catch (e) {
    console.error('Stripe Error:', e.message);
    res.status(500).json({ error: e.message });
  }
});

app.listen(8080, '0.0.0.0', () => {
  console.log('------------------------------------');
  console.log('Stripe Server is ACTIVE on port 8080');
  console.log('Keep this window open to process payments!');
  console.log('------------------------------------');
});
EOF\cat << 'EOF' > server.cjs
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: { currency: 'usd', product_data: { name: 'Ticket' }, unit_amount: 100 },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'http://100.115.92.205:8081/',
      cancel_url: 'http://100.115.92.205:8081/',
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
app.listen(8080, '0.0.0.0', () => console.log('SERVER IS RUNNING ON 8080'));
EOF

cat << 'EOF' > server.cjs
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: { currency: 'usd', product_data: { name: 'Ticket' }, unit_amount: 100 },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'http://100.115.92.205:8081/',
      cancel_url: 'http://100.115.92.205:8081/',
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
app.listen(8080, '0.0.0.0', () => console.log('SERVER IS RUNNING ON 8080'));
EOF

cat << 'EOF' > server.cjs
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: { currency: 'usd', product_data: { name: 'Ticket' }, unit_amount: 100 },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'http://100.115.92.205:8081/',
      cancel_url: 'http://100.115.92.205:8081/',
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
app.listen(8080, '0.0.0.0', () => console.log('SERVER IS RUNNING ON 8080'));
EOF

cat << 'EOF' > server.cjs
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: 'Lottery Ticket' },
          unit_amount: 100,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'http://100.115.92.205:8081/',
      cancel_url: 'http://100.115.92.205:8081/',
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(8080, '0.0.0.0', () => console.log('SERVER IS RUNNING ON 8080'));
EOF

node server.cjs
npm run dev -- --host
:~$ npm run dev -- --host
> vite_react_shadcn_ts@0.0.0 dev
> vite --host
Port 8080 is in use, trying another one...
sed -i "s|window.open(stripeUrl, '_blank');|fetch(stripeUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' } }).then(res => res.json()).then(data => { if (data.url) { window.location.href = data.url; } }).catch(err => console.error(err));|g" src/components/AppLayout.tsx
echo "STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE" > .env
node server.cjs
echo "const express = require('express'); const cors = require('cors'); const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); require('dotenv').config(); const app = express(); app.use(express.json()); app.use(cors()); app.post('/create-checkout-session', async (req, res) => { try { const session = await stripe.checkout.sessions.create({ payment_method_types: ['card'], line_items: [{ price_data: { currency: 'usd', product_data: { name: 'Ticket' }, unit_amount: 100 }, quantity: 1 }], mode: 'payment', success_url: 'http://192.168.1.207:8081/', cancel_url: 'http://192.168.1.207:8081/' }); res.json({ url: session.url }); } catch (e) { res.status(500).json({ error: e.message }); } }); app.listen(8080, '0.0.0.0', () => console.log('SERVER READY ON 8080'));" > server.cjs
sed -i "s|const stripeUrl = '.*';|const stripeUrl = 'http://192.168.1.207:8080/create-checkout-session';|" src/components/AppLayout.tsx
npm run dev -- --host
ngrok http 8081
STRIPE_SECRET_KEY=sk_test_51SdDzIFkQEA0QKBEVqEC77x7des35leu8U9CzrI8Wxxryix59HiOUj4CL2ShrA9WAaGhT2RSwuiQIYuyIKutzo5l00ISPL5jjT PORT=8081 node server.cjs
touch testfile
npm run dev -- --host 0.0.0.0 --port 3000
curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null
echo "deb https://ngrok-agent.s3.amazonaws.com buster main" | sudo tee /etc/apt/sources.list.d/ngrok.list
sudo apt update && sudo apt install ngrok
curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null && echo "deb https://ngrok-agent.s3.amazonaws.com buster main" | sudo tee /etc/apt/sources.list.d/ngrok.list && sudo apt update && sudo apt install ngrok -y
wget https://bin.equinox.io/c/b342ar6gCkn/ngrok-v3-stable-linux-amd64.tgz
sudo tar xvzf ngrok-v3-stable-linux-amd64.tgz -C /usr/local/bin
curl -o ngrok.tgz https://bin.equinox.io/c/b342ar6gCkn/ngrok-v3-stable-linux-amd64.tgz || wget -O ngrok.tgz https://bin.equinox.io/a/nm9S9v6M3fX/ngrok-v3-stable-linux-amd64.tgz
sudo tar xvzf ngrok.tgz -C /usr/local/bin
sudo snap install ngrok
sudo apt update && sudo apt install unzip -y
wget -O ngrok.zip https://bin.equinox.io/c/b342ar6gCkn/ngrok-v3-stable-linux-amd64.zip
unzip ngrok.zip
sudo mv ngrok /usr/local/bin/
unzip ngrok.zip
Archive:  ngrok.zip
unzip:  cannot find zipfile directory in one of ngrok.zip or
brillamy95@penguin:~$ sudo mv ngrok /usr/local/bin/
mv: cannot stat 'ngrok': No such file or directory
brillamy95@penguin:~$curl -L -o ngrok-exe https://bin.equinox.io/c/b342ar6gCkn/ngrok-v3-stable-linux-amd64.tgz
tar -xvzf ngrok-exe
sed -i "s|:8080|:8081|g" src/components/AppLayout.tsx
sed -i "s|http://192.168.1.207:8080|http://192.168.1.207:8081|g" src/components/AppLayout.tsx
grep "http://" src/components/AppLayout.tsx
sed -i "s|http://100.115.92.205:8081|http://192.168.1.207:8081|g" src/components/AppLayout.tsx
grep "http://" src/components/AppLayout.tsx
sed -i "s/unit_amount: [0-9]*/unit_amount: 100/g" server.cjs
sed -i "s|localhost:3000|192.168.1.207:3000|g" server.cjs
sed -i "s|http://[^:]*:3000|http://192.168.1.207:3000|g" server.cjs
// This tells the server what to do when the user lands on /success
app.get('/success', (req, res) => {
});
// Do the same for /cancel just in case
app.get('/cancel', (req, res) => {
});
nano server.cjs
sudo nano server.cjs
cat >> server.cjs <<EOF

app.get('/success', (req, res) => {
  res.send('<h1>Payment Successful!</h1><p>Thank you for your purchase.</p><a href="/">Go back home</a>');
});

app.get('/cancel', (req, res) => {
  res.send('<h1>Payment Cancelled</h1><p>Your items are still in your cart.</p><a href="/">Try again</a>');
});
EOF

node -e "console.log(process.version)"
npm list stripe
cd random_lottery_easy3.ziptep 1: Open Terminal 1 (The Storefront)
This terminal runs your Frontend (what the user sees).
Enter your project folder:
Bash
cd vite_react_shadcn_ts
Start the development server:
Bash
npm run dev -- --host
cd random_lottery_easy3.zip
cd vite_react_shadcn_ts
import { ShoppingCart, Sun, CheckCircle } from "lucide-react";
// Then use it in your button like this:
<Button className="gap-2">
</Button>
nano src/App.tsx
sudo apt update
vi src/App.tsx
npm run dev -- --host
ngrok config add-authtoken export NGROK_AUTHTOKEN=376288dauJKIwQXOGMtp4G2LKPE_3S8zFGPwP4RzSAMTkTwcD
version: 3
agent:
ngrok config add-authtoken 376288dauJKIwQXOGMtp4G2LKPE_3S8zFGPwP4RzSAMTkTwcD
node server.cjs
ngrok config add-authtoken 376288dauJKIwQXOGMtp4G2LKPE_3S8zFGPwP4RzSAMTkTwcD
node server.cjs
cat << 'EOF' > server.js
const express = require('express');
const stripe = require('stripe')('sk_test_51QY9E6RtxYp1mKWh9hG5q5p5q5p5q5p5q5p5q5p5q5p5q5p5q5p5q5p5q5p5q5p5q5p5q5p5q5p5q5p'); // Your Secret Key
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Function to generate the magic numbers
const generateNumbers = (game) => {
  const getRand = (min, max, count) => {
    let nums = new Set();
    while(nums.size < count) nums.add(Math.floor(Math.random() * (max - min + 1)) + min);
    return Array.from(nums).sort((a,b) => a-b).join(', ');
  };

  if (game === 'Powerball') return `${getRand(1, 69, 5)} | PB: ${getRand(1, 26, 1)}`;
  if (game === 'Missouri Lotto') return getRand(1, 44, 6);
  if (game === 'Pick 3') return getRand(0, 9, 3);
  if (game === 'Pick 4') return getRand(0, 9, 4);
  return getRand(1, 40, 5); // Default Lotto
};

app.post('/create-checkout-session', async (req, res) => {
  const { game } = req.body;
  const luckyNumbers = generateNumbers(game);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: { 
          name: `Sunny's Magic Numbers: ${game}`,
          description: `Your lucky numbers are being summoned...`
        },
        unit_amount: 99, // 99 cents
      },
      quantity: 1,
    }],
    mode: 'payment',
    // We pass the numbers in the success URL so the website can show them!
    success_url: `http://localhost:8080/success?game=${game}&numbers=${luckyNumbers}`,
    cancel_url: 'http://localhost:8080/',
  });

  res.json({ url: session.url });
});

app.listen(8081, () => console.log('Sunnydaze Magic Server running on port 8081'));
EOF

node server.js
cat << 'EOF' > server.js
import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';

const stripe = new Stripe('sk_test_51QY9E6RtxYp1mKWh9hG5q5p5q5p5q5p5q5p5q5p5q5p5q5p5q5p5q5p5q5p5q5p5q5p5q5p5q5p5q5p');
const app = express();

app.use(cors());
app.use(express.json());

const generateNumbers = (game) => {
  const getRand = (min, max, count) => {
    let nums = new Set();
    while(nums.size < count) nums.add(Math.floor(Math.random() * (max - min + 1)) + min);
    return Array.from(nums).sort((a,b) => a-b).join(', ');
  };

  if (game === 'Powerball') return `${getRand(1, 69, 5)} | PB: ${getRand(1, 26, 1)}`;
  if (game === 'Missouri Lotto') return getRand(1, 44, 6);
  if (game === 'Pick 3') return getRand(0, 9, 3);
  if (game === 'Pick 4') return getRand(0, 9, 4);
  return getRand(1, 40, 5); 
};

app.post('/create-checkout-session', async (req, res) => {
  try {
    const { game } = req.body;
    const luckyNumbers = generateNumbers(game);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { 
            name: `Sunny's Magic Numbers: ${game}`,
            description: `Your lucky numbers: ${luckyNumbers}`
          },
          unit_amount: 99, 
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `http://localhost:8080/success?game=${game}&numbers=${luckyNumbers}`,
      cancel_url: 'http://localhost:8080/',
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(8081, () => console.log('Sunnydaze Magic Server running on port 8081'));
EOF

node server.js
cat << 'EOF' > server.js
import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';

const stripe = new Stripe('sk_test_51QY9E6RtxYp1mKWh9hG5q5p5q5p5q5p5q5p5q5p5q5p5q5p5q5p5q5p5q5p5q5p5q5p5q5p5q5p5q5p');
const app = express();

app.use(cors());
app.use(express.json());

const generateNumbers = (game) => {
  const getRand = (min, max, count) => {
    let nums = new Set();
    while(nums.size < count) nums.add(Math.floor(Math.random() * (max - min + 1)) + min);
    return Array.from(nums).sort((a,b) => a-b).join(', ');
  };
  if (game === 'Powerball') return `${getRand(1, 69, 5)} | PB: ${getRand(1, 26, 1)}`;
  if (game === 'Missouri Lotto') return getRand(1, 44, 6);
  if (game === 'Pick 3') return getRand(0, 9, 3);
  if (game === 'Pick 4') return getRand(0, 9, 4);
  return getRand(1, 40, 5);
};

app.post('/create-checkout-session', async (req, res) => {
  try {
    const { game } = req.body;
    const luckyNumbers = generateNumbers(game);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { 
            name: `Sunny's Magic Numbers: ${game}`,
            description: `Lucky Pick: ${luckyNumbers}` 
          },
          unit_amount: 99,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `https://tawanna-semiperceptive-gloria.ngrok-free.dev/success?game=${game}&numbers=${luckyNumbers}`,
      cancel_url: `https://tawanna-semiperceptive-gloria.ngrok-free.dev/`,
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(8081, () => console.log('🔮 Sunnydaze Server Active on Port 8081'));
EOF

node server.js
ngrok http 8080
cd sunnydaze && npm run dev
1s
npm run dev -- --host
cat << 'EOF' > vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 8080,
    allowedHosts: [".ngrok-free.dev", ".ngrok.io"]
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
EOF

cat << 'EOF' > src/pages/Index.tsx
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Index() {
  const [reading, setReading] = useState("Choose a category below...");
  const [selectedGame, setSelectedGame] = useState("");

  const fortunes = {
    love: "A new heart-centered connection is glowing in your aura.",
    success: "The seeds of hard work are ready to bloom into gold.",
    relationship: "Harmonious energy is flowing between you and a loved one.",
    career: "A bold new door is opening; trust your intuition to walk through."
  };

  const handleReading = (category) => {
    setReading(fortunes[category]);
  };

  const handleCheckout = () => {
    if (!selectedGame) {
      alert("Please choose a lottery game first!");
      return;
    }
    // Connects to your server for the 99 cent payment
    fetch("http://100.115.92.205:8081/create-checkout-session", { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ game: selectedGame })
    })
    .then(res => res.json())
    .then(data => { if (data.url) window.location.href = data.url; })
    .catch(err => console.error("Error:", err));
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1a1a2e', color: 'white', padding: '40px 20px', fontFamily: 'serif' }}>
      
      {/* 1. Greeting */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#ffd700' }}>Hello, I am Sunny.</h1>
        <p style={{ fontSize: '1.2rem', color: '#ffc1cc' }}>I have been waiting for you. Please, choose a category for your reading.</p>
      </div>

      {/* 2. The Crystal Ball */}
      <div style={{ position: 'relative', width: '280px', height: '280px', margin: '0 auto 40px' }}>
        {/* Pink Mist Effect */}
        <div style={{ position: 'absolute', width: '320px', height: '320px', background: 'radial-gradient(circle, rgba(255,193,204,0.3) 0%, transparent 70%)', top: '-20px', left: '-20px', borderRadius: '50%' }}></div>
        
        {/* The Ball */}
        <div style={{ 
          width: '100%', height: '100%', borderRadius: '50%', 
          background: 'radial-gradient(circle at 30% 30%, #ffffff 0%, #ffd700 50%, #b8860b 100%)',
          boxShadow: '0 0 50px #ffd700, inset 0 0 50px white',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '30px', textAlign: 'center', color: '#1a1a2e', fontWeight: 'bold'
        }}>
          {reading}
        </div>
        
        {/* The Purple Base */}
        <div style={{ width: '160px', height: '40px', backgroundColor: '#4b0082', margin: '-10px auto 0', borderRadius: '0 0 20px 20px', boxShadow: '0 5px 15px black' }}></div>
      </div>

      {/* 3. Category Buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', maxWidth: '400px', margin: '0 auto 60px' }}>
        {['love', 'success', 'relationship', 'career'].map(cat => (
          <Button key={cat} onClick={() => handleReading(cat)} style={{ backgroundColor: '#4b0082', border: '1px solid #ffd700' }}>
            {cat.toUpperCase()}
          </Button>
        ))}
      </div>

      <hr style={{ border: '0.5px solid #333', marginBottom: '60px' }} />

      {/* 4. Lottery Section */}
      <div style={{ textAlign: 'center', maxWidth: '400px', margin: '0 auto' }}>
        <h2 style={{ color: '#ffd700' }}>Sunny's Magic Numbers</h2>
        <p>Choose your game for a personalized 99¢ lucky pick:</p>
        
        <div style={{ textAlign: 'left', margin: '20px auto', width: 'fit-content' }}>
          {['Powerball', 'Missouri Lotto', 'Pick 3', 'Pick 4', 'Lotto'].map(game => (
            <div key={game} style={{ marginBottom: '10px' }}>
              <input type="radio" name="game" id={game} onChange={() => setSelectedGame(game)} />
              <label htmlFor={game} style={{ marginLeft: '10px' }}>{game}</label>
            </div>
          ))}
        </div>

        <Button onClick={handleCheckout} style={{ width: '100%', backgroundColor: '#ffd700', color: 'black', fontWeight: 'bold' }}>
          GET MY NUMBERS ($0.99)
        </Button>
      </div>
    </div>
  );
}
EOF

sed -i 's|http://100.115.92.205:8081/create-checkout-session|https://tawanna-semiperceptive-gloria.ngrok-free.dev/create-checkout-session|g' src/pages/Index.tsx
cat << 'EOF' > src/pages/Index.tsx
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

export default function Index() {
  const [reading, setReading] = useState("Greetings, seeker...");
  const [selectedGame, setSelectedGame] = useState("");

  const fortunes = {
    love: "A heart-centered connection is glowing in your aura.",
    success: "The seeds of your hard work are ready to bloom into gold.",
    relationship: "Harmonious energy is flowing between you and a loved one.",
    career: "A bold new door is opening; trust your intuition."
  };

  const handleReading = (cat) => setReading(fortunes[cat]);

  const handleCheckout = async () => {
    if (!selectedGame) return alert("Please choose a game!");
    // We are pointing directly to your public ngrok link
    const res = await fetch("https://tawanna-semiperceptive-gloria.ngrok-free.dev/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ game: selectedGame })
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1a1a2e', color: 'white', padding: '40px 20px', textAlign: 'center' }}>
      <h1 style={{ color: '#ffd700', fontSize: '2.5rem' }}>Sunnydaze Magic</h1>
      <p style={{ color: '#ffc1cc', marginBottom: '30px' }}>I am Sunny. Choose a category and let the ball reveal your path.</p>

      {/* THE CRYSTAL BALL */}
      <div style={{ position: 'relative', width: '250px', height: '250px', margin: '0 auto 20px' }}>
        <div style={{ position: 'absolute', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(255,193,204,0.3) 0%, transparent 70%)', top: '-25px', left: '-25px', borderRadius: '50%' }}></div>
        <div style={{ 
          width: '100%', height: '100%', borderRadius: '50%', background: 'radial-gradient(circle at 30% 30%, #fff 0%, #ffd700 60%, #b8860b 100%)',
          boxShadow: '0 0 50px #ffd700', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a1a2e', fontWeight: 'bold', padding: '20px'
        }}>
          {reading}
        </div>
        <div style={{ width: '140px', height: '30px', background: '#4b0082', margin: '-5px auto 0', borderRadius: '0 0 20px 20px', borderBottom: '5px solid #330066' }}></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', maxWidth: '400px', margin: '30px auto' }}>
        {['love', 'success', 'relationship', 'career'].map(c => (
          <Button key={c} onClick={() => handleReading(c)} style={{ backgroundColor: '#4b0082', color: 'white' }}>{c.toUpperCase()}</Button>
        ))}
      </div>

      <hr style={{ borderColor: '#333', margin: '40px 0' }} />

      {/* LOTTERY SECTION */}
      <h2 style={{ color: '#ffd700' }}>Sunny's Magic Numbers</h2>
      <div style={{ textAlign: 'left', width: 'fit-content', margin: '20px auto' }}>
        {['Powerball', 'Missouri Lotto', 'Pick 3', 'Pick 4', 'Lotto'].map(game => (
          <div key={game} style={{ marginBottom: '10px' }}>
            <input type="radio" name="game" id={game} onChange={() => setSelectedGame(game)} />
            <label htmlFor={game} style={{ marginLeft: '10px' }}>{game}</label>
          </div>
        ))}
      </div>
      <Button onClick={handleCheckout} style={{ width: '100%', maxWidth: '300px', backgroundColor: '#ffd700', color: '#1a1a2e', fontWeight: 'bold' }}>GET MY NUMBERS ($0.99)</Button>
    </div>
  );
}
EOF

cat << 'EOF' > src/pages/Index.tsx
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

export default function Index() {
  const [reading, setReading] = useState("Greetings, seeker...");
  const [selectedGame, setSelectedGame] = useState("");

  const fortunes = {
    love: "A heart-centered connection is glowing in your aura.",
    success: "The seeds of your hard work are ready to bloom into gold.",
    relationship: "Harmonious energy is flowing between you and a loved one.",
    career: "A bold new door is opening; trust your intuition."
  };

  const handleReading = (cat) => setReading(fortunes[cat]);

  const handleCheckout = async () => {
    if (!selectedGame) return alert("Please choose a game!");
    // We are pointing directly to your public ngrok link
    const res = await fetch("https://tawanna-semiperceptive-gloria.ngrok-free.dev/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ game: selectedGame })
EOF;</div>>r: '#ffd700', color: '#1a1a2e', fontWeight: 'bold' }}>GET MY NUMBERS ($0.9
brillamy95@penguin:~$cat << 'EOF' > src/pages/Index.tsx
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

export default function Index() {
  const [reading, setReading] = useState("Greetings, seeker...");
  const [selectedGame, setSelectedGame] = useState("");

  const fortunes = {
    love: "A heart-centered connection is glowing in your aura.",
    success: "The seeds of your hard work are ready to bloom into gold.",
    relationship: "Harmonious energy is flowing between you and a loved one.",
    career: "A bold new door is opening; trust your intuition."
  };

  const handleReading = (cat) => setReading(fortunes[cat]);

  const handleCheckout = async () => {
    if (!selectedGame) return alert("Please choose a game!");
    // We are pointing directly to your public ngrok link
    const res = await fetch("https://tawanna-semiperceptive-gloria.ngrok-free.dev/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ game: selectedGame })
EOF;</div>>r: '#ffd700', color: '#1a1a2e', fontWeight: 'bold' }}>GET MY NUMBERS ($0.9
brillamy95@penguin:~$ 
cat << 'EOF' > src/pages/Index.tsx
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

export default function Index() {
  const [reading, setReading] = useState("Greetings, seeker...");
  const [selectedGame, setSelectedGame] = useState("");

  const fortunes = {
    love: "A heart-centered connection is glowing in your aura.",
    success: "The seeds of your hard work are ready to bloom into gold.",
    relationship: "Harmonious energy is flowing between you and a loved one.",
    career: "A bold new door is opening; trust your intuition."
  };

  const handleReading = (cat) => setReading(fortunes[cat]);

  const handleCheckout = async () => {
    if (!selectedGame) return alert("Please choose a game!");
    const res = await fetch("https://tawanna-semiperceptive-gloria.ngrok-free.dev/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ game: selectedGame })
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1a1a2e', color: 'white', padding: '40px 20px', textAlign: 'center' }}>
      <h1 style={{ color: '#ffd700', fontSize: '2.5rem' }}>Sunnydaze Magic</h1>
      <p style={{ color: '#ffc1cc', marginBottom: '30px' }}>I am Sunny. Choose a category and let the ball reveal your path.</p>

      {/* THE CRYSTAL BALL */}
      <div style={{ position: 'relative', width: '250px', height: '250px', margin: '0 auto 20px' }}>
        {/* Pink Mist */}
        <div style={{ position: 'absolute', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(255,193,204,0.3) 0%, transparent 70%)', top: '-25px', left: '-25px', borderRadius: '50%' }}></div>
        
        {/* The Ball - Now Light Greyish Blue */}
        <div style={{ 
          width: '100%', height: '100%', borderRadius: '50%', 
          background: 'radial-gradient(circle at 30% 30%, #ffffff 0%, #eef2f3 40%, #d1d9e0 100%)',
          boxShadow: '0 0 40px rgba(255, 215, 0, 0.4), inset -10px -10px 50px rgba(0,0,0,0.2)', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2c3e50', fontWeight: 'bold', padding: '25px',
          border: '1px solid rgba(255,255,255,0.3)'
        }}>
          {reading}
        </div>
        
        {/* Purple Base */}
        <div style={{ width: '140px', height: '30px', background: '#4b0082', margin: '-5px auto 0', borderRadius: '0 0 20px 20px', borderBottom: '5px solid #330066' }}></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', maxWidth: '400px', margin: '30px auto' }}>
        {['love', 'success', 'relationship', 'career'].map(c => (
          <Button key={c} onClick={() => handleReading(c)} style={{ backgroundColor: '#4b0082', color: 'white', border: '1px solid #ffd700' }}>
            {c.toUpperCase()}
          </Button>
        ))}
      </div>

      <hr style={{ borderColor: '#333', margin: '40px 0' }} />

      <h2 style={{ color: '#ffd700' }}>Sunny's Magic Numbers</h2>
      <div style={{ textAlign: 'left', width: 'fit-content', margin: '20px auto' }}>
        {['Powerball', 'Missouri Lotto', 'Pick 3', 'Pick 4', 'Lotto'].map(game => (
          <div key={game} style={{ marginBottom: '10px' }}>
            <input type="radio" name="game" id={game} onChange={() => setSelectedGame(game)} />
            <label htmlFor={game} style={{ marginLeft: '10px' }}>{game}</label>
          </div>
        ))}
      </div>
      <Button onClick={handleCheckout} style={{ width: '100%', maxWidth: '300px', backgroundColor: '#ffd700', color: '#1a1a2e', fontWeight: 'bold' }}>
        GET MY NUMBERS ($0.99)
      </Button>
    </div>
  );
}
EOF

cat << 'EOF' > src/pages/Index.tsx
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

export default function Index() {
  const [reading, setReading] = useState("Greetings, seeker...");
  const [selectedGame, setSelectedGame] = useState("");

  const fortunes = {
    love: "A heart-centered connection is glowing in your aura.",
    success: "The seeds of your hard work are ready to bloom into gold.",
    relationship: "Harmonious energy is flowing between you and a loved one.",
    career: "A bold new door is opening; trust your intuition."
  };

  const handleReading = (cat) => setReading(fortunes[cat]);

  const handleCheckout = async () => {
    if (!selectedGame) return alert("Please choose a game!");
    const res = await fetch("https://tawanna-semiperceptive-gloria.ngrok-free.dev/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ game: selectedGame })
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  };
EOF

cat << 'EOF' >> src/pages/Index.tsx

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1a1a2e', color: 'white', padding: '40px 20px', textAlign: 'center' }}>
      <h1 style={{ color: '#ffd700', fontSize: '2.5rem' }}>Sunnydaze Magic</h1>
      <p style={{ color: '#ffc1cc', marginBottom: '30px' }}>I am Sunny. Choose a category and let the ball reveal your path.</p>

      <div style={{ position: 'relative', width: '250px', height: '250px', margin: '0 auto 20px' }}>
        <div style={{ position: 'absolute', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(255,193,204,0.3) 0%, transparent 70%)', top: '-25px', left: '-25px', borderRadius: '50%' }}></div>
        <div style={{ 
          width: '100%', height: '100%', borderRadius: '50%', 
          background: 'radial-gradient(circle at 30% 30%, #ffffff 0%, #eef2f3 40%, #d1d9e0 100%)',
          boxShadow: '0 0 40px rgba(255, 215, 0, 0.4), inset -10px -10px 50px rgba(0,0,0,0.2)', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2c3e50', fontWeight: 'bold', padding: '25px',
          border: '1px solid rgba(255,255,255,0.3)'
        }}>
          {reading}
        </div>
        <div style={{ width: '140px', height: '30px', background: '#4b0082', margin: '-5px auto 0', borderRadius: '0 0 20px 20px', borderBottom: '5px solid #330066' }}></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', maxWidth: '400px', margin: '30px auto' }}>
        {['love', 'success', 'relationship', 'career'].map(c => (
          <Button key={c} onClick={() => handleReading(c)} style={{ backgroundColor: '#4b0082', color: 'white', border: '1px solid #ffd700' }}>{c.toUpperCase()}</Button>
        ))}
      </div>

      <hr style={{ borderColor: '#333', margin: '40px 0' }} />

      <h2 style={{ color: '#ffd700' }}>Sunny's Magic Numbers</h2>
      <div style={{ textAlign: 'left', width: 'fit-content', margin: '20px auto' }}>
        {['Powerball', 'Missouri Lotto', 'Pick 3', 'Pick 4', 'Lotto'].map(game => (
          <div key={game} style={{ marginBottom: '10px' }}>
            <input type="radio" name="game" id={game} onChange={() => setSelectedGame(game)} />
            <label htmlFor={game} style={{ marginLeft: '10px' }}>{game}</label>
          </div>
        ))}
      </div>
      <Button onClick={handleCheckout} style={{ width: '100%', maxWidth: '300px', backgroundColor: '#ffd700', color: '#1a1a2e', fontWeight: 'bold' }}>GET MY NUMBERS ($0.99)</Button>
    </div>
  );
}
EOF

cat << 'EOF' >> src/pages/Index.tsx

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1a1a2e', color: 'white', padding: '40px 20px', textAlign: 'center' }}>
      <h1 style={{ color: '#ffd700', fontSize: '2.5rem' }}>Sunnydaze Magic</h1>
      <p style={{ color: '#ffc1cc', marginBottom: '30px' }}>I am Sunny. Choose a category and let the ball reveal your path.</p>

      <div style={{ position: 'relative', width: '250px', height: '250px', margin: '0 auto 20px' }}>
        <div style={{ position: 'absolute', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(255,193,204,0.3) 0%, transparent 70%)', top: '-25px', left: '-25px', borderRadius: '50%' }}></div>
        <div style={{ 
          width: '100%', height: '100%', borderRadius: '50%', 
          background: 'radial-gradient(circle at 30% 30%, #ffffff 0%, #eef2f3 40%, #d1d9e0 100%)',
          boxShadow: '0 0 40px rgba(255, 215, 0, 0.4), inset -10px -10px 50px rgba(0,0,0,0.2)', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2c3e50', fontWeight: 'bold', padding: '25px',
          border: '1px solid rgba(255,255,255,0.3)'
        }}>
          {reading}
        </div>
        <div style={{ width: '140px', height: '30px', background: '#4b0082', margin: '-5px auto 0', borderRadius: '0 0 20px 20px', borderBottom: '5px solid #330066' }}></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', maxWidth: '400px', margin: '30px auto' }}>
        {['love', 'success', 'relationship', 'career'].map(c => (
          <Button key={c} onClick={() => handleReading(c)} style={{ backgroundColor: '#4b0082', color: 'white', border: '1px solid #ffd700' }}>{c.toUpperCase()}</Button>
        ))}
      </div>

      <hr style={{ borderColor: '#333', margin: '40px 0' }} />

      <h2 style={{ color: '#ffd700' }}>Sunny's Magic Numbers</h2>
      <div style={{ textAlign: 'left', width: 'fit-content', margin: '20px auto' }}>
        {['Powerball', 'Missouri Lotto', 'Pick 3', 'Pick 4', 'Lotto'].map(game => (
          <div key={game} style={{ marginBottom: '10px' }}>
            <input type="radio" name="game" id={game} onChange={() => setSelectedGame(game)} />
            <label htmlFor={game} style={{ marginLeft: '10px' }}>{game}</label>
          </div>
        ))}
      </div>
      <Button onClick={handleCheckout} style={{ width: '100%', maxWidth: '300px', backgroundColor: '#ffd700', color: '#1a1a2e', fontWeight: 'bold' }}>GET MY NUMBERS ($0.99)</Button>
    </div>
  );
}
EOF

$ cat << 'EOF' >> src/pages/Index.tsx

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1a1a2e', color: 'white', padding: '40px 20px', textAlign: 'center' }}>
      <h1 style={{ color: '#ffd700', fontSize: '2.5rem' }}>Sunnydaze Magic</h1>
      <p style={{ color: '#ffc1cc', marginBottom: '30px' }}>I am Sunny. Choose a category and let the ball reveal your path.</p>

      <div style={{ position: 'relative', width: '250px', height: '250px', margin: '0 auto 20px' }}>
        <div style={{ position: 'absolute', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(255,193,204,0.3) 0%, transparent 70%)', top: '-25px', left: '-25px', borderRadius: '50%' }}></div>
        <div style={{ 
          width: '100%', height: '100%', borderRadius: '50%', 
          background: 'radial-gradient(circle at 30% 30%, #ffffff 0%, #eef2f3 40%, #d1d9e0 100%)',
          boxShadow: '0 0 40px rgba(255, 215, 0, 0.4), inset -10px -10px 50px rgba(0,0,0,0.2)', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2c3e50', fontWeight: 'bold', padding: '25px',
          border: '1px solid rgba(255,255,255,0.3)'
        }}>
          {reading}
EOF;</div>>r: '#ffd700', color: '#1a1a2e', fontWeight: 'bold' }}>GET MY NUMBERS ($0.9
brillamy95@penguin:~$ $ cat << 'EOF' >> src/pages/Index.tsx

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1a1a2e', color: 'white', padding: '40px 20px', textAlign: 'center' }}>
      <h1 style={{ color: '#ffd700', fontSize: '2.5rem' }}>Sunnydaze Magic</h1>
      <p style={{ color: '#ffc1cc', marginBottom: '30px' }}>I am Sunny. Choose a category and let the ball reveal your path.</p>

      <div style={{ position: 'relative', width: '250px', height: '250px', margin: '0 auto 20px' }}>
        <div style={{ position: 'absolute', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(255,193,204,0.3) 0%, transparent 70%)', top: '-25px', left: '-25px', borderRadius: '50%' }}></div>
        <div style={{ 
          width: '100%', height: '100%', borderRadius: '50%', 
          background: 'radial-gradient(circle at 30% 30%, #ffffff 0%, #eef2f3 40%, #d1d9e0 100%)',
          boxShadow: '0 0 40px rgba(255, 215, 0, 0.4), inset -10px -10px 50px rgba(0,0,0,0.2)', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2c3e50', fontWeight: 'bold', padding: '25px',
          border: '1px solid rgba(255,255,255,0.3)'
        }}>
          {reading}
EOF;</div>>r: '#ffd700', color: '#1a1a2e', fontWeight: 'bold' }}>GET MY NUMBERS ($0.9
brillamy95@penguin:~$ 

cat << 'EOF' > src/pages/Index.tsx
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

export default function Index() {
  const [reading, setReading] = useState("Greetings, seeker...");
  const [selectedGame, setSelectedGame] = useState("");
  const fortunes = {
    love: "A heart-centered connection is glowing.",
    success: "Hard work is blooming into gold.",
    relationship: "Harmony is flowing to you.",
    career: "A bold new door is opening."
  };
  const handleReading = (cat) => setReading(fortunes[cat]);
  const handleCheckout = async () => {
    if (!selectedGame) return alert("Pick a game!");
    const res = await fetch("https://tawanna-semiperceptive-gloria.ngrok-free.dev/create-checkout-session", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ game: selectedGame })
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  };
EOFcat << 'EOF' > src/pages/Index.tsx
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

export default function Index() {
  const [reading, setReading] = useState("Greetings, seeker...");
  const [selectedGame, setSelectedGame] = useState("");
  const fortunes = {
    love: "A heart-centered connection is glowing.",
    success: "Hard work is blooming into gold.",
    relationship: "Harmony is flowing to you.",
    career: "A bold new door is opening."
  };
  const handleReading = (cat) => setReading(fortunes[cat]);
  const handleCheckout = async () => {
    if (!selectedGame) return alert("Pick a game!");
    const res = await fetch("https://tawanna-semiperceptive-gloria.ngrok-free.dev/create-checkout-session", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ game: selectedGame })
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  };
EOF

cat << 'EOF' > src/pages/Index.tsx
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

export default function Index() {
  const [reading, setReading] = useState("Greetings, seeker...");
  const [selectedGame, setSelectedGame] = useState("");
  const fortunes = {
    love: "A heart-centered connection is glowing.",
    success: "Hard work is blooming into gold.",
    relationship: "Harmony is flowing to you.",
    career: "A bold new door is opening."
  };
  const handleReading = (cat) => setReading(fortunes[cat]);
  const handleCheckout = async () => {
    if (!selectedGame) return alert("Pick a game!");
    const res = await fetch("https://tawanna-semiperceptive-gloria.ngrok-free.dev/create-checkout-session", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ game: selectedGame })
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  };
EOF

cat << 'EOF' >> src/pages/Index.tsx
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', maxWidth: '300px', margin: '20px auto' }}>
        {['love', 'success', 'relationship', 'career'].map(c => (
          <Button key={c} onClick={() => handleReading(c)} style={{ backgroundColor: '#4b0082' }}>{c.toUpperCase()}</Button>
        ))}
      </div>
      <h2 style={{ color: '#ffd700' }}>Lucky Numbers</h2>
      <div style={{ textAlign: 'left', width: 'fit-content', margin: '10px auto' }}>
        {['Powerball', 'Missouri Lotto', 'Pick 3', 'Pick 4'].map(game => (
          <div key={game}><input type="radio" name="game" onChange={() => setSelectedGame(game)} /> {game}</div>
        ))}
      </div>
EOF

cat << 'EOF' >> src/pages/Index.tsx
      <Button onClick={handleCheckout} style={{ backgroundColor: '#ffd700', color: '#1a1a2e' }}>GET NUMBERS ($0.99)</Button>
    </div>
  );
}
EOF

cat << 'EOF' > src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Success from "./pages/Success";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/success" element={<Success />} />
    </Routes>
  </BrowserRouter>
);
export default App;
EOF

cat << 'EOF' >> src/pages/Index.tsx
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
export default function Index() {
  const [reading, setReading] = useState("Greetings, seeker...");
  const [selectedGame, setSelectedGame] = useState("");
  const fortunes = { love: "Love is near.", success: "Wealth is coming.", relationship: "Harmony flows.", career: "New doors open." };
  const handleReading = (cat) => setReading(fortunes[cat]);
  const handleCheckout = async () => {
    if (!selectedGame) return alert("Pick a game!");
    const res = await fetch("https://tawanna-semiperceptive-gloria.ngrok-free.dev/create-checkout-session", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ game: selectedGame })
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  };
EOF

cat << 'EOF' >> src/pages/Index.tsx
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1a1a2e', color: 'white', padding: '40px 20px', textAlign: 'center' }}>
      <h1>Sunnydaze Magic</h1>
      <div style={{ position: 'relative', width: '200px', height: '200px', margin: '20px auto' }}>
        <div style={{ position: 'absolute', width: '240px', height: '240px', background: 'radial-gradient(circle, rgba(255,193,204,0.3) 0%, transparent 70%)', top: '-20px', left: '-20px', borderRadius: '50%' }}></div>
        <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'radial-gradient(circle at 30% 30%, #fff 0%, #d1d9e0 100%)', boxShadow: '0 0 40px #ffd700', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a1a2e', fontWeight: 'bold', padding: '20px' }}>
          {reading}
        </div>
      </div>
EOF

cat << 'EOF' >> src/pages/Index.tsx
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', maxWidth: '300px', margin: '20px auto' }}>
        {['love', 'success', 'relationship', 'career'].map(c => (
          <Button key={c} onClick={() => handleReading(c)} style={{ backgroundColor: '#4b0082' }}>{c.toUpperCase()}</Button>
        ))}
      </div>
EOF

cat << 'EOF' >> src/pages/Index.tsx
      <h3>Lucky Numbers</h3>
      {['Powerball', 'Lotto', 'Pick 3'].map(g => (
        <div key={g}><input type="radio" name="g" onChange={() => setSelectedGame(g)} /> {g}</div>
      ))}
      <Button onClick={handleCheckout} style={{ backgroundColor: '#ffd700', color: '#1a1a2e', marginTop: '20px' }}>GET NUMBERS ($0.99)</Button>
    </div>
  );
}
EOF

cat << 'EOF' > src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Success from "./pages/Success";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/success" element={<Success />} />
    </Routes>
  </BrowserRouter>
);
export default App;
EOF

npm run dev -- --=host
npm run dev -- --host
