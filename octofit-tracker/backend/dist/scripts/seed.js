"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("../models/User"));
const Team_1 = __importDefault(require("../models/Team"));
const Activity_1 = __importDefault(require("../models/Activity"));
const Leaderboard_1 = __importDefault(require("../models/Leaderboard"));
const Workout_1 = __importDefault(require("../models/Workout"));
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('🌱 Starting to seed octofit_db database with test data...');
        // Clear existing data
        await User_1.default.deleteMany({});
        await Team_1.default.deleteMany({});
        await Activity_1.default.deleteMany({});
        await Leaderboard_1.default.deleteMany({});
        await Workout_1.default.deleteMany({});
        console.log('✓ Cleared existing collections');
        // Create Users
        const users = await User_1.default.insertMany([
            {
                name: 'Alex Johnson',
                email: 'alex@example.com',
                bio: 'Fitness enthusiast and marathon runner',
                joinDate: new Date('2024-01-15'),
                totalWorkouts: 45,
                totalCalories: 15200
            },
            {
                name: 'Sarah Williams',
                email: 'sarah@example.com',
                bio: 'CrossFit competitor and trainer',
                joinDate: new Date('2024-02-01'),
                totalWorkouts: 52,
                totalCalories: 18600
            },
            {
                name: 'Mike Chen',
                email: 'mike@example.com',
                bio: 'Yoga and meditation practitioner',
                joinDate: new Date('2024-01-20'),
                totalWorkouts: 38,
                totalCalories: 11200
            },
            {
                name: 'Emma Davis',
                email: 'emma@example.com',
                bio: 'Cycling enthusiast, loves outdoor activities',
                joinDate: new Date('2024-03-10'),
                totalWorkouts: 30,
                totalCalories: 13500
            },
            {
                name: 'James Wilson',
                email: 'james@example.com',
                bio: 'Gym rat and personal trainer',
                joinDate: new Date('2024-02-20'),
                totalWorkouts: 48,
                totalCalories: 16800
            }
        ]);
        console.log(`✓ Created ${users.length} users`);
        // Create Teams
        const teams = await Team_1.default.insertMany([
            {
                name: 'Fitness Warriors',
                description: 'A team dedicated to achieving fitness goals through consistency',
                members: [users[0]._id, users[1]._id],
                createdAt: new Date('2024-01-15'),
                totalCalories: 33800
            },
            {
                name: 'Active Explorers',
                description: 'Outdoor enthusiasts who love running, cycling, and hiking',
                members: [users[2]._id, users[3]._id],
                createdAt: new Date('2024-02-01'),
                totalCalories: 24700
            },
            {
                name: 'Strength Squad',
                description: 'Weight training and bodybuilding focused team',
                members: [users[4]._id, users[0]._id],
                createdAt: new Date('2024-03-01'),
                totalCalories: 32000
            }
        ]);
        console.log(`✓ Created ${teams.length} teams`);
        // Create Activities
        const activities = await Activity_1.default.insertMany([
            {
                userId: users[0]._id,
                type: 'running',
                duration: 45,
                calories: 450,
                distance: 7.2,
                intensity: 'high',
                timestamp: new Date('2024-09-10T06:30:00'),
                description: 'Morning run in the park'
            },
            {
                userId: users[1]._id,
                type: 'crossfit',
                duration: 60,
                calories: 600,
                intensity: 'high',
                timestamp: new Date('2024-09-10T17:00:00'),
                description: 'CrossFit class - AMRAP'
            },
            {
                userId: users[2]._id,
                type: 'yoga',
                duration: 75,
                calories: 200,
                intensity: 'low',
                timestamp: new Date('2024-09-10T07:00:00'),
                description: 'Vinyasa flow session'
            },
            {
                userId: users[3]._id,
                type: 'cycling',
                duration: 90,
                calories: 720,
                distance: 35,
                intensity: 'moderate',
                timestamp: new Date('2024-09-10T08:00:00'),
                description: 'Long distance cycling'
            },
            {
                userId: users[4]._id,
                type: 'weightlifting',
                duration: 60,
                calories: 350,
                intensity: 'high',
                timestamp: new Date('2024-09-10T18:00:00'),
                description: 'Leg day strength training'
            },
            {
                userId: users[0]._id,
                type: 'swimming',
                duration: 40,
                calories: 380,
                distance: 1.6,
                intensity: 'moderate',
                timestamp: new Date('2024-09-09T06:00:00'),
                description: 'Swimming laps'
            }
        ]);
        console.log(`✓ Created ${activities.length} activities`);
        // Create Leaderboard Entries
        const leaderboardEntries = await Leaderboard_1.default.insertMany([
            {
                userId: users[1]._id,
                teamId: teams[0]._id,
                rank: 1,
                totalCalories: 18600,
                totalWorkouts: 52,
                weeklyCalories: 4200,
                lastUpdated: new Date()
            },
            {
                userId: users[0]._id,
                teamId: teams[0]._id,
                rank: 2,
                totalCalories: 15200,
                totalWorkouts: 45,
                weeklyCalories: 3800,
                lastUpdated: new Date()
            },
            {
                userId: users[4]._id,
                teamId: teams[2]._id,
                rank: 3,
                totalCalories: 16800,
                totalWorkouts: 48,
                weeklyCalories: 3600,
                lastUpdated: new Date()
            },
            {
                userId: users[3]._id,
                teamId: teams[1]._id,
                rank: 4,
                totalCalories: 13500,
                totalWorkouts: 30,
                weeklyCalories: 2900,
                lastUpdated: new Date()
            },
            {
                userId: users[2]._id,
                teamId: teams[1]._id,
                rank: 5,
                totalCalories: 11200,
                totalWorkouts: 38,
                weeklyCalories: 2400,
                lastUpdated: new Date()
            }
        ]);
        console.log(`✓ Created ${leaderboardEntries.length} leaderboard entries`);
        // Create Workouts
        const workouts = await Workout_1.default.insertMany([
            {
                userId: users[0]._id,
                name: 'Marathon Training Week 1',
                description: 'Beginner-friendly marathon training routine',
                difficulty: 'beginner',
                duration: 45,
                exercises: ['warm-up jog', 'steady pace running', 'cool-down walk'],
                caloriesBurned: 450,
                createdAt: new Date('2024-08-01')
            },
            {
                userId: users[1]._id,
                name: 'HIIT Cardio Blast',
                description: 'High intensity interval training for maximum calorie burn',
                difficulty: 'advanced',
                duration: 30,
                exercises: ['burpees', 'mountain climbers', 'jump squats', 'push-ups'],
                caloriesBurned: 400,
                createdAt: new Date('2024-08-05')
            },
            {
                userId: users[2]._id,
                name: 'Relaxing Flow Yoga',
                description: 'Gentle yoga sequence for flexibility and relaxation',
                difficulty: 'beginner',
                duration: 60,
                exercises: ['child pose', 'downward dog', 'warrior poses', 'savasana'],
                caloriesBurned: 200,
                createdAt: new Date('2024-08-10')
            },
            {
                userId: users[3]._id,
                name: 'Cycling Hill Climbs',
                description: 'Intermediate cycling workout focused on inclines',
                difficulty: 'intermediate',
                duration: 60,
                exercises: ['warm-up pedal', 'hill climb intervals', 'recovery pace'],
                caloriesBurned: 500,
                createdAt: new Date('2024-08-12')
            },
            {
                userId: users[4]._id,
                name: 'Full Body Strength',
                description: 'Complete strength training routine for all muscle groups',
                difficulty: 'intermediate',
                duration: 75,
                exercises: ['squats', 'bench press', 'deadlifts', 'rows', 'shoulder press'],
                caloriesBurned: 600,
                createdAt: new Date('2024-08-15')
            }
        ]);
        console.log(`✓ Created ${workouts.length} workouts`);
        console.log('\n✅ Database seeding completed successfully!');
        console.log(`
📊 Summary:
   - Users: ${users.length}
   - Teams: ${teams.length}
   - Activities: ${activities.length}
   - Leaderboard entries: ${leaderboardEntries.length}
   - Workouts: ${workouts.length}
    `);
        process.exit(0);
    }
    catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
//# sourceMappingURL=seed.js.map