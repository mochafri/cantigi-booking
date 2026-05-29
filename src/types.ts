export type BookingData = {
    date: string | null;
    selectedPackage: 'outing_2d1n' | 'outing_1d' | 'umum' | null;
    fullName: string;
    email: string;
    phone: string;
    groupSize: number;
    specialRequests: string;
    paymentMethod: 'cc' | 'transfer' | 'ewallet' | null;
};
