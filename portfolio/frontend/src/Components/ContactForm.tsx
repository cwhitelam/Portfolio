import React, { useState } from 'react';

interface ContactFormProps {
    darkMode: boolean;
}

const API_URL = 'http://localhost:5001';

const ContactForm: React.FC<ContactFormProps> = ({ darkMode }) => {
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        const form = e.currentTarget;
        const formData = new FormData(form);
        const payload = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
        };

        console.log('Sending request to:', `${API_URL}/api/email/send`);
        console.log('Payload:', payload);

        try {
            const response = await fetch(`${API_URL}/api/email/send`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            console.log('Response status:', response.status);
            console.log('Response headers:', Object.fromEntries(response.headers.entries()));

            let data;
            const textResponse = await response.text();
            console.log('Raw response:', textResponse);

            try {
                data = JSON.parse(textResponse);
            } catch (e) {
                console.error('Error parsing response:', e);
                data = { error: textResponse || 'Server error' };
            }

            if (response.ok) {
                setSubmitted(true);
                form.reset();
                console.log('Email sent successfully');
            } else {
                const errorMessage = data?.error || 'Failed to send message. Please try again.';
                console.error('Server error:', errorMessage);
                setError(errorMessage);
            }
        } catch (error) {
            console.error('Network error:', error);
            setError('Unable to connect to the server. Please check your connection and try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`${darkMode ? 'bg-dark-card text-dark-text' : 'bg-light-card text-light-text'} rounded-3xl p-8 shadow-lg`}>
            <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
            {submitted ? (
                <p className="text-accent-yellow text-xl">Thank you for your message! I'll get back to you soon.</p>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block mb-1">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className={`w-full p-2 rounded-md ${darkMode ? 'bg-dark-bg text-white' : 'bg-gray-100 text-black'}`}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className={`w-full p-2 rounded-md ${darkMode ? 'bg-dark-bg text-white' : 'bg-gray-100 text-black'}`}
                        />
                    </div>
                    <div>
                        <label htmlFor="subject" className="block mb-1">Subject</label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            className={`w-full p-2 rounded-md ${darkMode ? 'bg-dark-bg text-white' : 'bg-gray-100 text-black'}`}
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block mb-1">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            required
                            rows={4}
                            className={`w-full p-2 rounded-md ${darkMode ? 'bg-dark-bg text-white' : 'bg-gray-100 text-black'}`}
                        />
                    </div>
                    {error && (
                        <p className="text-red-500 text-sm mt-2">{error}</p>
                    )}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`bg-accent-yellow text-white px-6 py-2 rounded-md transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-90'
                            }`}
                    >
                        {isLoading ? 'Sending...' : 'Send Message'}
                    </button>
                </form>
            )}
        </div>
    );
};

export default ContactForm;

