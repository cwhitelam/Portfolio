import React, { useState } from 'react';

interface ContactFormProps {
    darkMode: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({ darkMode }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5080';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch(`${API_URL}/api/contacts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, message }),
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Contact saved:', data);
                setSubmitted(true);
                setName('');
                setEmail('');
                setMessage('');
            } else {
                const errorText = await response.text();
                console.error('Server response:', response.status, errorText);
                setError(`Failed to submit form: ${response.status} ${response.statusText}. ${errorText}`);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setError(`An error occurred while submitting the form: ${error instanceof Error ? error.message : String(error)}`);
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className={`w-full p-2 rounded-md ${darkMode ? 'bg-dark-bg text-white' : 'bg-gray-100 text-black'}`}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className={`w-full p-2 rounded-md ${darkMode ? 'bg-dark-bg text-white' : 'bg-gray-100 text-black'}`}
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block mb-1">Message</label>
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            rows={4}
                            className={`w-full p-2 rounded-md ${darkMode ? 'bg-dark-bg text-white' : 'bg-gray-100 text-black'}`}
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="bg-accent-yellow text-dark-bg px-6 py-2 rounded-full text-lg font-semibold hover:bg-opacity-80 transition-colors"
                    >
                        Send Message
                    </button>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </form>
            )}
        </div>
    );
};

export default ContactForm;

