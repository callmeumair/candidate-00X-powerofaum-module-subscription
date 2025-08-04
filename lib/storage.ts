import fs from 'fs';
import path from 'path';
import { SubscriptionData, AddonData } from './stripe';

const DATA_DIR = path.join(process.cwd(), 'data');
const SUBSCRIPTIONS_FILE = path.join(DATA_DIR, 'subscriptions.json');
const ADDONS_FILE = path.join(DATA_DIR, 'addons.json');

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

// Add-on Purchase Storage Functions

// Load add-ons from file
export function loadAddons(): AddonData[] {
  ensureDataDir();
  
  if (!fs.existsSync(ADDONS_FILE)) {
    return [];
  }
  
  try {
    const data = fs.readFileSync(ADDONS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading add-ons:', error);
    return [];
  }
}

// Save add-ons to file
export function saveAddons(addons: AddonData[]): void {
  ensureDataDir();
  
  try {
    fs.writeFileSync(ADDONS_FILE, JSON.stringify(addons, null, 2));
  } catch (error) {
    console.error('Error saving add-ons:', error);
  }
}

// Add new add-on purchase
export function addAddon(addon: AddonData): void {
  const addons = loadAddons();
  addons.push(addon);
  saveAddons(addons);
}

// Get add-ons by vendor ID
export function getAddonsByVendor(vendorId: string): AddonData[] {
  const addons = loadAddons();
  return addons.filter(addon => addon.stripe_account_id === vendorId);
}

// Get add-on by session ID
export function getAddonBySessionId(sessionId: string): AddonData | undefined {
  const addons = loadAddons();
  return addons.find(addon => addon.sessionId === sessionId);
}

// Update add-on status
export function updateAddonStatus(sessionId: string, status: AddonData['status'], pdfUrl?: string): void {
  const addons = loadAddons();
  const addonIndex = addons.findIndex(addon => addon.sessionId === sessionId);
  
  if (addonIndex !== -1) {
    addons[addonIndex].status = status;
    if (pdfUrl) {
      addons[addonIndex].pdfUrl = pdfUrl;
    }
    saveAddons(addons);
  }
}

// Get vendor add-on purchase status
export function getVendorAddonStatus(vendorId: string) {
  const vendorAddons = getAddonsByVendor(vendorId);
  
  const totalAddons = vendorAddons.length;
  const totalRevenueCents = vendorAddons.reduce((sum, addon) => sum + addon.amount_cents, 0);
  const totalCommissionCents = Math.floor(totalRevenueCents * 0.2); // 20% platform commission
  
  return {
    totalAddons,
    totalRevenueCents,
    totalCommissionCents,
  };
} 