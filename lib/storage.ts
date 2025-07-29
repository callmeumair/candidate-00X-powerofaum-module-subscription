import fs from 'fs';
import path from 'path';
import { SubscriptionData } from './stripe';

const DATA_DIR = path.join(process.cwd(), 'data');
const SUBSCRIPTIONS_FILE = path.join(DATA_DIR, 'subscriptions.json');

// Ensure data directory exists
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// Load subscriptions from file
export function loadSubscriptions(): SubscriptionData[] {
  ensureDataDir();
  
  if (!fs.existsSync(SUBSCRIPTIONS_FILE)) {
    return [];
  }
  
  try {
    const data = fs.readFileSync(SUBSCRIPTIONS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading subscriptions:', error);
    return [];
  }
}

// Save subscriptions to file
export function saveSubscriptions(subscriptions: SubscriptionData[]): void {
  ensureDataDir();
  
  try {
    fs.writeFileSync(SUBSCRIPTIONS_FILE, JSON.stringify(subscriptions, null, 2));
  } catch (error) {
    console.error('Error saving subscriptions:', error);
  }
}

// Add new subscription
export function addSubscription(subscription: SubscriptionData): void {
  const subscriptions = loadSubscriptions();
  subscriptions.push(subscription);
  saveSubscriptions(subscriptions);
}

// Get subscriptions by vendor ID
export function getSubscriptionsByVendor(vendorId: string): SubscriptionData[] {
  const subscriptions = loadSubscriptions();
  return subscriptions.filter(sub => sub.stripe_account_id === vendorId);
}

// Get vendor sales status
export function getVendorSalesStatus(vendorId: string) {
  const vendorSubscriptions = getSubscriptionsByVendor(vendorId);
  
  const totalSubscriptions = vendorSubscriptions.length;
  const totalRevenueCents = vendorSubscriptions.reduce((sum, sub) => sum + sub.amount_cents, 0);
  const totalCommissionCents = Math.floor(totalRevenueCents * 0.2); // 20% platform commission
  
  return {
    totalSubscriptions,
    totalRevenueCents,
    totalCommissionCents,
  };
} 