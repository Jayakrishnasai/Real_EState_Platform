
require('dotenv').config();
const mongoose = require('mongoose');
const Property = require('./models/Property');

const properties = [
    {
        title: 'The Glass Pavilion',
        description: 'A masterpiece of modern architecture featuring wall-to-wall glass, an infinity pool, and unbroken 360-degree views of the Los Angeles basin. Designed by a renowned architect, this property offers unmatched privacy and luxury.',
        price: 12500000,
        location: 'Beverly Hills, CA',
        imageUrl: '/hero.png',
        bedrooms: 6,
        bathrooms: 8,
        area: 12000,
        amenities: ['Infinity Pool', 'Home Theater', 'Wine Cellar', 'Smart Home Tech', 'Heliport']
    },
    {
        title: 'Tropical Oasis Villa',
        description: 'An exotic retreat nestled in the vibrant heart of Miami. Featuring lush landscaping, a private dock, and stunning modern concrete construction that blends seamlessly with nature. Perfect for entertaining or quiet seclusion.',
        price: 8900000,
        location: 'Miami, FL',
        imageUrl: '/villa.png',
        bedrooms: 5,
        bathrooms: 6,
        area: 8500,
        amenities: ['Private Dock', 'Outdoor Kitchen', 'Guest House', 'Spa', 'Lush Gardens']
    },
    {
        title: 'Skyline Penthouse',
        description: 'Experience the pinnacle of urban living in this bespoke Manhattan penthouse. Boasting towering ceilings, custom gold finishes, and a sprawling terrace that looks over Central Park. Unrivaled luxury high above the city.',
        price: 5400000,
        location: 'Manhattan, NY',
        imageUrl: '/apartment.png',
        bedrooms: 3,
        bathrooms: 4,
        area: 4200,
        amenities: ['Private Elevator', 'Wraparound Terrace', 'Concierge Service', 'Gym access', 'Valet Parking']
    },
    {
        title: 'Tirumala Foothills Estate',
        description: 'Experience divine tranquility at the foothills of the sacred Seven Hills. This premium estate blends traditional Vaastu architecture with ultra-modern amenities. Features lush botanical gardens, a private meditation pavilion, and panoramic views of the temple town.',
        price: 15500000,
        location: 'Tirupati, India',
        imageUrl: '/villa.png',
        bedrooms: 6,
        bathrooms: 6,
        area: 9500,
        amenities: ['Meditation Pavilion', 'Lotus Pond', 'Home Theater', 'Smart Climate Control', 'Helipad']
    },
    {
        title: 'Spiritual Grandeur Villa',
        description: 'A palatial residence offering the ultimate in serene luxury. This sprawling villa is a masterful fusion of contemporary design and timeless spiritual elegance, offering expansive courtyards, an indoor pool, and majestic views of the Tirumala hills.',
        price: 21000000,
        location: 'Tirupati, India',
        imageUrl: '/hero.png',
        bedrooms: 8,
        bathrooms: 10,
        area: 15000,
        amenities: ['Indoor Pool', 'Courtyard Gardens', 'Grand Dining Hall', 'Concierge Quarters', 'Private Temple']
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Seed: Connected to MongoDB');
        
        await Property.deleteMany({});
        console.log('Seed: Cleared existing properties');
        
        await Property.insertMany(properties);
        console.log('Seed: Inserted 5 premium properties');
        
        await mongoose.connection.close();
        console.log('Seed: Connection closed');
        process.exit(0);
    } catch (error) {
        console.error('Seed: Error seeding database:', error);
        process.exit(1);
    }
};

seedDB();
