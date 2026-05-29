export type BookingData = {
    date: number | null;
    fullName: string;
    email: string;
    phone: string;
    groupSize: number;
    specialRequests: string;
    paymentMethod: 'cc' | 'transfer' | 'ewallet' | null;
};
