export type BookingData = {
    date: string | null;
    fullName: string;
    email: string;
    phone: string;
    groupSize: number;
    specialRequests: string;
    paymentMethod: 'cc' | 'transfer' | 'ewallet' | null;
};
