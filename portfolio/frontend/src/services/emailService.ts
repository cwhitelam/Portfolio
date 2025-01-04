interface EmailData {
    name: string;
    email: string;
    message: string;
}

export const sendEmail = async (data: EmailData): Promise<Response> => {
    try {
        const response = await fetch('https://localhost:7240/api/email/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to send email');
        }

        return response;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}; 