export const MOVIES = [
    {
  id: "m1",
  title: "King of Boys",
  description: "A powerful businesswoman and philanthropist with a dangerous connection to the criminal underworld battles to maintain her empire as political ambitions collide with street power.",
  duration: "140 min",
  rating: 9,
  genre: "Crime/Thriller",
  poster: "👑",
},
{
  id: "m2",
  title: "Gangs of Lagos",
  description: "Three childhood friends growing up in the notorious Lagos island community of Isale Eko must navigate loyalty, survival and the consequences of the paths they choose.",
  duration: "120 min",
  rating: 8,
  genre: "Action/Drama",
  poster: "🌆",
},
{
  id: "m3",
  title: "Brotherhood",
  description: "Twin brothers find themselves on opposite sides of the law when one becomes a police officer and the other joins a notorious armed robbery gang terrorizing Lagos.",
  duration: "135 min",
  rating: 8,
  genre: "Action/Thriller",
  poster: "⚔️",
},
{
  id: "m4",
  title: "Breath of Life",
  description: "A young Igbo woman defies tradition and family expectations to pursue medicine during the turbulent post-civil war era in Nigeria, discovering love and loss along the way.",
  duration: "118 min",
  rating: 7,
  genre: "Historical Drama",
  poster: "🌺",
},
{
  id: "m5",
  title: "Anikulapo",
  description: "Set in ancient Yorubaland, a young cloth weaver is killed by a powerful king but is brought back to life by Sango, the god of thunder, setting off a chain of fate and betrayal.",
  duration: "150 min",
  rating: 9,
  genre: "Fantasy/Epic",
  poster: "⚡",
},
{
  id: "m6",
  title: "The Wedding Party",
  description: "A group of friends gather for a wedding in Lagos, only to find themselves caught in a web of lies, secrets, and unexpected twists that challenge their friendships and loyalties.",
  duration: "125 min",
  rating: 7,
  genre: "Comedy/Drama",
  poster: "💒",
}
,
{
  id: "m7",
  title: "Sardauna",
  description: "A legendary warrior queen of the Hausa people fights to protect her kingdom from invasion and internal betrayal in this epic tale of courage and honor.",
  duration: "145 min",
  rating: 8,
  genre: "Epic/Historical",
  poster: "👑",
}
  

];

export const THEATERS = [
    {id:"t1", name:"Lagos Movie Theater", city:"Lagos Island, Lagos", status: "Active", row: 10, seatsPerRow: 10},
    {id:"t2", name:"Kano Cinema Hall", city:"Kano City, Kano", status: "Active", row: 7, seatsPerRow: 10},
    {id:"t3", name:"Ibadan Grand Theater", city:"Ibadan, Oyo", status: "Maintenance", row: 7, seatsPerRow: 6},
    {id:"t4", name:"Enugu Multiplex", city:"Enugu City, Enugu", status: "Active", row: 7, seatsPerRow: 10},
    {id:"t5", name:"Port Harcourt Plaza", city:"Port Harcourt, Rivers", status: "Active", row: 9, seatsPerRow: 8},
    { id: "t1", name: "CineMax Downtown",  city: "New York",    status: "Active",      rows: 8, seatsPerRow: 10 },
];

export const SHOWS = [
      { id: "s1", movieId: "m1", theaterId: "t1", startTime: "10:00 AM", date: "2026-02-20", price: 18.5 },
      { id: "s2", movieId: "m2", theaterId: "t1", startTime: "1:30 PM", date: "2026-02-20", price: 18.5},
      { id: "s3", movieId: "m3", theaterId: "t2", startTime: "4:00 PM", date: "2026-02-20", price: 15.0 },
      { id: "s4", movieId: "m4", theaterId: "t3", startTime: "7:30 PM", date: "2026-02-20", price: 12.0 },
      { id: "s5", movieId: "m5", theaterId: "t4", startTime: "9:00 PM", date: "2026-02-20", price: 20.0 },
      { id: "s6", movieId: "m6", theaterId: "t5", startTime: "6:00 PM", date: "2026-02-20", price: 16.0 },
      { id: "s7", movieId: "m7", theaterId: "t1", startTime: "8:00 PM", date: "2026-02-20", price: 18.0 }

];

export const BOOKINGS = [
    { id: "BK1021", userId: "u1", movieId: "m1", showId: "s2", theaterId: "t1", seats: ["D4",], total: 37.0,  status: "Confirmed", date: "2026-02-20" },
    { id: "BK1022", userId: "u2", movieId: "m3", showId: "s3", theaterId: "t2", seats: ["F1", "C2", "H2"], total: 45.0, status: "Pending", date: "2026-02-20" },
    { id: "BK1023", userId: "u3", movieId: "m5", showId: "s5", theaterId: "t3", seats: ["A2", "E1" ], total: 40.0, status: "Confirmed", date: "2026-02-20" },
    { id: "BK1024", userId: "u4", movieId: "m7", showId: "s7", theaterId: "t4", seats: ["C5", "C6", "C8"], total: 54.0, status: "Cancelled", date: "2026-02-20" },
    { id: "BK1025", userId: "u5", movieId: "m2", showId: "s2", theaterId: "t5", seats: ["B5", "B4"], total: 37.0, status: "Confirmed", date: "2026-02-20" },
    { id: "BK1026", userId: "u1", movieId: "m4", showId: "s4", theaterId: "t6", seats: ["E8"], total: 24.0, status: "Pending", date: "2026-02-20" },
    { id: "BK1027", userId: "u2", movieId: "m6", showId: "s6", theaterId: "t7", seats: ["G1", "G2"], total: 32.0, status: "Confirmed", date: "2026-02-20" }
];

export const MOCK_USERS = [
    { id: "u1", name: "Ekwe Dotun", email: "dotun@email.com", password: "user123", role: "user" },
    { id: "u4", name: "Ejiofor Nelson", email: "nelson@email.com", password: "user123", role: "user" },
    { id: "u5", name: "Dotun Favour", email: "favour@email.com", password: "user123", role: "user" },
    
];

export const THEATER_ADMINS = [
    { id: "a2", name: "Haliya karem", email: "haliya@email.com", password: "haliya123", role: "admin", theaterId: "t2", createdDate: "2026-03-015" },
    { id: "a3", name: "Adewole Adedotun", email: "dotun@email.com", password: "dotun123", role: "admin", theaterId: "t2", createdDate: "2026-03-06" },

]; 

export const SUPER_ADMIN = {
  email: "superadmin@ekwe.internal",
  password: "Super@Admin2026!",
  name: "Ekwe Emmanuel",
  role: "super_admin",
};

// Seat Generator
const BOOKED = new Set(["A3","B5","C2","C8","D4","E1","E7","F3","F9","G6","H2","H8"]);


export function generateSeats(theaterId = "t1") {
  const theater = THEATERS.find(t => t.id === theaterId) || THEATERS[0];
  const rowLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").slice(0, theater.rows);
  return rowLetters.map(row => ({
    row,
    seats: Array.from({ length: theater.seatsPerRow }, (_, i) => ({
      id: `${row}${i + 1}`,
      number: i + 1,
      status: BOOKED.has(`${row}${i + 1}`) ? "booked" : "available",
    })),
  }));
}