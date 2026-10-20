declare const bookTicket: (ticketId: string, userId: string) => Promise<{
    status: string;
    message: string;
    ticketId?: never;
    userId?: never;
    bookingTime?: never;
} | {
    status: string;
    message: string;
    ticketId: string;
    userId: string;
    bookingTime: string;
}>;
declare const getTicketStatus: (ticketId: string) => Promise<{
    ticketId: string;
    isCurrentlyLocked: boolean;
    isBooked: boolean;
    bookedBy: string | null;
}>;
export declare const LockService: {
    bookTicket: typeof bookTicket;
    getTicketStatus: typeof getTicketStatus;
};
export {};
//# sourceMappingURL=lock.service.d.ts.map