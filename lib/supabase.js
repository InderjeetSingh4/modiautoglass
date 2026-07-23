import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export async function submitQuoteRequest(formData) {
  if (!supabase) {
    console.warn("Supabase credentials missing. Mocking success for quote request.");
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { success: true, data: [formData] };
  }

  try {
    const { data, error } = await supabase.from("quote_requests").insert([
      {
        year: formData.year,
        make: formData.make,
        model: formData.model,
        damage_type: formData.damageType,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) return { success: false, error };
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err };
  }
}

export async function submitMobileBooking(payload) {
  if (!supabase) {
    console.warn("Supabase credentials missing. Mocking success for mobile booking.");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { success: true, data: [payload] };
  }

  try {
    const { data, error } = await supabase.from("service_bookings").insert([
      {
        car_make: payload.car_make,
        car_model: payload.car_model,
        glass_type: payload.glass_type,
        phone_number: payload.phone_number,
        service_address: payload.service_address,
        status: payload.status || "pending",
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) return { success: false, error };
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err };
  }
}
