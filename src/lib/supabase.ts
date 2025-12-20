import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://jxjawgbmvpsrfhcoewuv.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjM5MzFiY2RjLTQxYjMtNDU3My04Y2JiLWRmNDZlOTI2NDI0ZiJ9.eyJwcm9qZWN0SWQiOiJqeGphd2dibXZwc3JmaGNvZXd1diIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzY1NDM2NjcxLCJleHAiOjIwODA3OTY2NzEsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.v3DCvRf5phGsHx7_RDJMHVNT0YmH7Qih8CvfKuO30HE';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };