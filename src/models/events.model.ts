export interface Event {
    id: string;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    location?: string;
    image?: string;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: string;
    updatedBy?: string;
    createdById?: string;
    updatedById?: string;
    createdByEmail?: string;
    updatedByEmail?: string;
    createdByName?: string;
    updatedByName?: string;
}