require("dotenv").config();
const mongoose = require("mongoose");
const Service = require("./models/Service");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected for Seeding"))
  .catch(err => console.log(err));

const services = [
  { name: "Netflix", domain: "netflix.com", link: "https://www.netflix.com/cancelplan", top: true, plans: ["Mobile: ₹149/mo", "Basic: ₹199/mo", "Standard: ₹499/mo", "Premium: ₹649/mo"] },
  { name: "Amazon Prime", domain: "amazon.com", link: "https://www.amazon.com/mc/pip/cancel", top: true, plans: ["Monthly: ₹299", "Annual: ₹1499", "Lite: ₹799/yr"] },
  { name: "Spotify", domain: "spotify.com", link: "https://www.spotify.com/account", top: true, plans: ["Mini: ₹7/day", "Individual: ₹119/mo", "Student: ₹59/mo", "Family: ₹179/mo"] },
  { name: "Disney+", domain: "disneyplus.com", link: "https://www.disneyplus.com/account", top: true, plans: ["Mobile: ₹499/yr", "Super: ₹899/yr", "Premium: ₹1499/yr"] },
  { name: "YouTube Premium", domain: "youtube.com", link: "https://www.youtube.com/paid_memberships", top: true, plans: ["Individual: ₹129/mo", "Family: ₹189/mo", "Lite: ₹89/mo"] },
  { name: "JioHotstar", domain: "jiohotstar.com", link: "https://www.jiohotstar.com/", top: true, plans: ["Premium: ₹299/mo", "Annual: ₹1499/yr"] },
  { name: "Apple TV+", domain: "apple.com", link: "https://tv.apple.com/settings", top: true, plans: ["Monthly: ₹99/mo", "Apple One: ₹365/mo"] },
  { name: "Hulu", domain: "hulu.com", link: "https://secure.hulu.com/account", top: true, plans: ["With Ads: $7.99/mo", "No Ads: $17.99/mo"] },
  { name: "Max (HBO)", domain: "max.com", link: "https://www.max.com/", top: true, plans: ["Basic: $9.99/mo", "Ad-Free: $15.99/mo", "Ultimate: $19.99/mo"] },
  { name: "SonyLIV", domain: "sonyliv.com", link: "https://www.sonyliv.com/subscription", top: true, plans: ["LIV Premium: ₹299/mo", "Mobile Only: ₹599/yr"] },
  { name: "Microsoft 365", domain: "microsoft.com", link: "https://www.microsoft.com/en-us/microsoft-365/buy", top: true, plans: ["Personal: ₹489/mo", "Family: ₹619/mo", "Business: ₹660/user"] },
  { name: "Google Workspace", domain: "workspace.google.com", link: "https://workspace.google.com/pricing.html", top: true, plans: ["Starter: ₹125/user", "Standard: ₹736/user", "Plus: ₹1380/user"] },
  { name: "Adobe CC", domain: "adobe.com", link: "https://www.adobe.com/creativecloud/plans.html", plans: ["All Apps: ₹4630/mo", "Photography: ₹797/mo"] },
  { name: "Slack", domain: "slack.com", link: "https://slack.com/pricing", plans: ["Pro: ₹215/user", "Business+: ₹370/user"] },
  { name: "Zoom", domain: "zoom.us", link: "https://zoom.us/pricing", plans: ["Pro: ₹1300/mo", "Business: ₹1800/mo"] },
  { name: "ChatGPT Plus", domain: "openai.com", link: "https://openai.com/chatgpt/pricing/", plans: ["Plus: $20/mo", "Team: $25/mo"] },
  { name: "Claude Pro", domain: "anthropic.com", link: "https://www.anthropic.com/claude", plans: ["Pro: $20/mo", "Team: $30/mo"] },
  { name: "Canva Pro", domain: "canva.com", link: "https://www.canva.com/pricing/", plans: ["Pro: ₹399/mo", "Teams: ₹659/mo"] },
  { name: "Grammarly", domain: "grammarly.com", link: "https://www.grammarly.com/plans", plans: ["Premium: $12/mo", "Business: $15/mo"] },
  { name: "Notion", domain: "notion.so", link: "https://www.notion.so/pricing", plans: ["Plus: $8/mo", "Business: $15/mo"] },
  { name: "Figma", domain: "figma.com", link: "https://www.figma.com/pricing/", plans: ["Professional: $12/mo", "Organization: $45/mo"] },
  { name: "Dropbox", domain: "dropbox.com", link: "https://www.dropbox.com/plans", plans: ["Plus: $9.99/mo", "Essentials: $18/mo"] },
  { name: "LinkedIn", domain: "linkedin.com", link: "https://premium.linkedin.com/", plans: ["Career: ₹2000/mo", "Business: ₹3200/mo"] },
  { name: "GitHub", domain: "github.com", link: "https://github.com/pricing", plans: ["Copilot: $10/mo", "Team: $4/user"] },
  { name: "Asana", domain: "asana.com", link: "https://asana.com/pricing", plans: ["Starter: $10.99/mo", "Advanced: $24.99/mo"] },
  { name: "HubSpot", domain: "hubspot.com", link: "https://www.hubspot.com/pricing", plans: ["Starter: $15/mo", "Professional: $800/mo"] },
  { name: "Shopify", domain: "shopify.com", link: "https://www.shopify.com/pricing", plans: ["Basic: ₹1994/mo", "Advanced: ₹22000/mo"] },
  { name: "Trello", domain: "trello.com", link: "https://trello.com/pricing", plans: ["Standard: $5/mo", "Premium: $10/mo"] },
  { name: "Zendesk", domain: "zendesk.com", link: "https://www.zendesk.com/pricing/", plans: ["Suite Team: $55/mo", "Suite Growth: $89/mo"] },
  { name: "Mailchimp", domain: "mailchimp.com", link: "https://mailchimp.com/pricing/", plans: ["Essentials: ₹925/mo", "Standard: ₹1370/mo"] },
  { name: "SEMrush", domain: "semrush.com", link: "https://www.semrush.com/pricing/", plans: ["Pro: $129/mo", "Guru: $249/mo"] },
  { name: "Zapier", domain: "zapier.com", link: "https://zapier.com/pricing", plans: ["Starter: $19/mo", "Professional: $49/mo"] },
  { name: "Miro", domain: "miro.com", link: "https://miro.com/pricing/", plans: ["Starter: $8/mo", "Business: $16/mo"] },
  { name: "Jira", domain: "atlassian.com", link: "https://www.atlassian.com/software/jira/pricing", plans: ["Standard: $8.15/user", "Premium: $16/user"] },
  { name: "Midjourney", domain: "midjourney.com", link: "https://www.midjourney.com/pricing", plans: ["Basic: $10/mo", "Standard: $30/mo", "Pro: $60/mo"] },
  { name: "Runway ML", domain: "runwayml.com", link: "https://runwayml.com/pricing/", plans: ["Standard: $12/mo", "Pro: $28/mo"] },
  { name: "Audible", domain: "audible.com", link: "https://www.audible.com", plans: ["Premium Plus: $14.95/mo"] },
  { name: "Peacock", domain: "peacocktv.com", link: "https://www.peacocktv.com/", plans: ["Premium: $5.99/mo", "Ad-Free: $11.99/mo"] },
  { name: "Paramount+", domain: "paramountplus.com", link: "https://www.paramountplus.com/", plans: ["Essential: $5.99/mo", "With SHOWTIME: $11.99/mo"] },
  { name: "ESPN+", domain: "espn.com", link: "https://plus.espn.com/", plans: ["Monthly: $10.99/mo", "Annual: $109.99/yr"] },
  { name: "Costco", domain: "costco.com", link: "https://www.costco.com/membership", plans: ["Gold Star: $60/yr", "Executive: $120/yr"] },
  { name: "HelloFresh", domain: "hellofresh.com", link: "https://www.hellofresh.com/", plans: ["2 People/3 Meals: $70/week"] },
  { name: "Salesforce", domain: "salesforce.com", link: "https://www.salesforce.com/products/pricing/", plans: ["Starter: $25/mo", "Professional: $80/mo"] },
  { name: "QuickBooks", domain: "intuit.com", link: "https://quickbooks.intuit.com/pricing/", plans: ["Simple Start: ₹400/mo", "Essentials: ₹600/mo"] },
  { name: "Zoho CRM", domain: "zoho.com", link: "https://www.zoho.com/crm/pricing.html", plans: ["Standard: ₹800/mo", "Professional: ₹1500/mo"] },
  { name: "Patreon", domain: "patreon.com", link: "https://www.patreon.com/pricing", plans: ["Pro: 8% revenue", "Premium: 12% revenue"] },
  { name: "Substack", domain: "substack.com", link: "https://substack.com/pricing", plans: ["Free: 0", "Paid: 10% fee"] },
  { name: "Kajabi", domain: "kajabi.com", link: "https://kajabi.com/pricing", plans: ["Basic: $149/mo", "Growth: $199/mo"] },
  { name: "Thinkific", domain: "thinkific.com", link: "https://www.thinkific.com/pricing/", plans: ["Basic: $36/mo", "Start: $74/mo"] },
  { name: "Podia", domain: "podia.com", link: "https://www.podia.com/pricing", plans: ["Mover: $33/mo", "Shaker: $75/mo"] }
];

async function seedDB() {
  await Service.deleteMany({});
  await Service.insertMany(services);
  console.log("Database Seeded Successfully");
  mongoose.connection.close();
}

seedDB();
Service.deleteMany({})
  .then(() => {
    console.log("Old services removed");
    return Service.insertMany(services);
  })
  .then(() => {
    console.log("Database seeded successfully");
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(err);
    mongoose.connection.close();
  });
