export const MOVIE = [
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

export const THEATER = [
    {id:"t1", name:"Lagos Movie Theater", city:"Lagos Island, Lagos", status: "Active"},
    {id:"t2", name:"Kano Cinema Hall", city:"Kano City, Kano", status: "Active"},
    {id:"t3", name:"Ibadan Grand Theater", city:"Ibadan, Oyo", status: "Maintenance"},
    {id:"t4", name:"Enugu Multiplex", city:"Enugu City, Enugu", status: "Active"},
    {id:"t5", name:"Port Harcourt Plaza", city:"Port Harcourt, Rivers", status: "Active"},
];

export const SHOWTIME = [
      { id: "s1", movieId: "m1", theaterId: "t1", startTime: "10:00 AM", date: "2026-02-20", price: 18.5 },
      { id: "s2", movieId: "m2", theaterId: "t1", startTime: "1:30 PM", date: "2026-02-20", price: 18.5},
      { id: "s3", movieId: "m3", theaterId: "t2", startTime: "4:00 PM", date: "2026-02-20", price: 15.0 },
      { id: "s4", movieId: "m4", theaterId: "t3", startTime: "7:30 PM", date: "2026-02-20", price: 12.0 },
      { id: "s5", movieId: "m5", theaterId: "t4", startTime: "9:00 PM", date: "2026-02-20", price: 20.0 },
      { id: "s6", movieId: "m6", theaterId: "t5", startTime: "6:00 PM", date: "2026-02-20", price: 16.0 },
      { id: "s7", movieId: "m7", theaterId: "t1", startTime: "8:00 PM", date: "2026-02-20", price: 18.0 }

];

export const BOOKING = [
    { id: "BK1021", userId: "u1", movieId: "m1", showId: "s2", seats: ["D4",], total: 37.0,  status: "Confirmed", date: "2026-02-20" },
    { id: "BK1022", userId: "u2", movieId: "m3", showId: "s3", seats: ["F1", "C2", "H2"], total: 45.0, status: "Pending", date: "2026-02-20" },
    { id: "BK1023", userId: "u3", movieId: "m5", showId: "s5", seats: ["A2", "E1" ], total: 40.0, status: "Confirmed", date: "2026-02-20" },
    { id: "BK1024", userId: "u4", movieId: "m7", showId: "s7", seats: ["C5", "C6", "C8"], total: 54.0, status: "Cancelled", date: "2026-02-20" },
    { id: "BK1025", userId: "u5", movieId: "m2", showId: "s2", seats: ["B5", "B4"], total: 37.0, status: "Confirmed", date: "2026-02-20" },
    { id: "BK1026", userId: "u1", movieId: "m4", showId: "s4", seats: ["E8"], total: 24.0, status: "Pending", date: "2026-02-20" },
    { id: "BK1027", userId: "u2", movieId: "m6", showId: "s6", seats: ["G1", "G2"], total: 32.0, status: "Confirmed", date: "2026-02-20" }
];

export const MOCK_USER = [
    { id: "u1", name: "Ekwe Dotun", email: "dotun@email.com", password: "user123", role: "user" },
    { id: "u4", name: "Ejiofor Nelson", email: "nelson@email.com", password: "user123", role: "user" },
    { id: "u5", name: "Dotun Favour", email: "favour@email.com", password: "user123", role: "user" },
    
];

export const ADMIN_USER = [
    { id: "u2", name: "Admin User", email: "admin@email.com", password: "admin123", role: "admin" },
    { id: "u3", name: "Super Admin", email: "superadmin@email.com", password: "superadmin123", role: "super_admin" },

]; 

const BOOKED_SEATS = new Set(["A3","B5","C2","C8","D4","E1","E7","F3","F9","G6","H2","H8"]);


export function generateSeats() {
  const rows = ["A","B","C","D","E","F","G","H"];

  return rows.map((row) => ({
    row,
    seats: Array.from({ length: 10 }, (_, index) => ({
      id: `${row}${index + 1}`,
      number: index + 1,
      status: BOOKED_SEATS.has(`${row}${index + 1}`) ? "booked" : "available",
    })),
  }));
}