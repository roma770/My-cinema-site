import React, { useState } from 'react';
import { Ticket, Star, MapPin, X, Armchair, ChevronDown, Percent, Info, Gift, CreditCard, Clock, Play } from 'lucide-react';

const movies = [
  {
    id: 1,
    title: "DIUNA: CZĘŚĆ DRUGA",
    genre: "Sci-Fi / Akcja",
    duration: "166 min",
    rating: 8.9,
    image: "https://image.tmdb.org/t/p/original/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    tags: ["IMAX", "2D"],
    showtimes: ["14:30", "17:00", "20:45"],
    prices: { normal: 34, student: 28, happy: 22 },
    color: "rgba(220, 38, 38, 0.3)"
  },
  {
    id: 2,
    title: "INTERSTELLAR",
    genre: "Sci-Fi / Dramat",
    duration: "169 min",
    rating: 8.7,
    image: "https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/430042eb-ee69-4818-aed0-a312400a26bf/600x900",
    tags: ["2D", "NAPISY"],
    showtimes: ["16:15", "19:30"],
    prices: { normal: 28, student: 22, happy: 18 },
    color: "rgba(37, 99, 235, 0.3)"
  },
  {
    id: 3,
    title: "BIEDNE ISTOTY",
    genre: "Komedia / Sci-Fi",
    duration: "141 min",
    rating: 8.1,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS7lRfkF86FHpOdJloomCspO6uV_0kgWiCFQ&s",
    tags: ["2D", "NAPISY"],
    showtimes: ["15:00", "21:00"],
    prices: { normal: 28, student: 22, happy: 18 },
    color: "rgba(147, 51, 234, 0.3)"
  },
  {
    id: 4,
    title: "OPPENHEIMER",
    genre: "Biograficzny / Dramat",
    duration: "180 min",
    rating: 8.6,
    image: "https://cdn.руни.рф/images/b/bf/%D0%9E%D0%BF%D0%BF%D0%B5%D0%BD%D0%B3%D0%B5%D0%B9%D0%BC%D0%B5%D1%80_%D1%84%D0%B8%D0%BB%D1%8C%D0%BC_%D0%BF%D0%BE%D1%81%D1%82%D0%B5%D1%80.jpg",
    tags: ["70MM", "IMAX"],
    showtimes: ["13:00", "18:00"],
    prices: { normal: 36, student: 30, happy: 24 },
    color: "rgba(234, 179, 8, 0.3)"
  },
  {
    id: 5,
    title: "KUNG FU PANDA 4",
    genre: "Animacja / Przygodowy",
    duration: "94 min",
    rating: 7.0,
    image: "https://kino-zary.pl/wp-content/uploads/2024/02/xkungfu.jpg.pagespeed.ic.h_VSf9-3AP.jpg",
    tags: ["DUBBING", "2D"],
    showtimes: ["11:00", "13:15", "15:30"],
    prices: { normal: 26, student: 20, happy: 16 },
    color: "rgba(34, 197, 94, 0.3)"
  },
  {
    id: 6,
    title: "THE BATMAN",
    genre: "Kryminał / Akcja",
    duration: "176 min",
    rating: 8.2,
    image: "https://m.media-amazon.com/images/I/81DGyn3r62L._AC_SL1500_.jpg",
    tags: ["4K", "2D"],
    showtimes: ["19:00", "22:15"],
    prices: { normal: 30, student: 24, happy: 20 },
    color: "rgba(71, 85, 105, 0.3)"
  }
];

const cities = ["WARSZAWA", "KRAKÓW", "WROCŁAW", "GDAŃSK", "POZNAŃ", "ŁÓDŹ"];

function App() {
  const [activeTab, setActiveTab] = useState('repertuar');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [currentCity, setCurrentCity] = useState("WARSZAWA");
  const [isCityOpen, setIsCityOpen] = useState(false);

  const toggleSeat = (id) => {
    setSelectedSeats(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-red-600/30">
      
      {/* NAVIGATION */}
      <nav className="fixed top-0 w-full z-[100] bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => setActiveTab('repertuar')}>
            <div className="w-11 h-11 bg-red-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.4)] group-hover:scale-110 transition-transform">
              <Ticket className="text-white fill-current" size={22} />
            </div>
            <span className="text-2xl font-black italic tracking-tighter uppercase">CINE<span className="text-red-600">FLEX</span></span>
          </div>

          <div className="hidden md:flex gap-10">
            {['repertuar', 'promocje', 'cennik'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-[11px] font-black uppercase tracking-[0.3em] transition-all relative py-2 ${activeTab === tab ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
              >
                {tab}
                {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.8)]"></div>}
              </button>
            ))}
          </div>

          <button onClick={() => setIsCityOpen(!isCityOpen)} className="flex items-center gap-2 bg-white/5 px-5 py-2.5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
            <MapPin size={14} className="text-red-600" />
            <span className="text-[11px] font-black uppercase tracking-widest">{currentCity}</span>
            <ChevronDown size={12} className={isCityOpen ? 'rotate-180' : ''} />
          </button>
        </div>
      </nav>

      {/* DROPDOWN CITIES */}
      {isCityOpen && (
        <div className="fixed inset-0 z-[110] flex justify-end p-20 pointer-events-none">
          <div className="w-56 bg-[#111]/95 backdrop-blur-2xl border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl pointer-events-auto animate-in fade-in slide-in-from-top-5 h-fit">
            {cities.map(city => (
              <button key={city} onClick={() => { setCurrentCity(city); setIsCityOpen(false); }} className={`w-full text-left px-6 py-4 text-[10px] font-black hover:bg-red-600 transition-colors uppercase tracking-widest ${currentCity === city ? 'text-red-500 bg-white/5' : 'text-gray-400'}`}>
                {city}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className="pt-20">
        {activeTab === 'repertuar' && (
          <>
            {/* HERO SECTION */}
            <header className="relative min-h-screen flex items-center overflow-hidden px-8">
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent z-10"></div>
              <img src={movies[0].image} className="absolute inset-0 w-full h-full object-cover opacity-30 blur-md scale-105" alt="bg" />
              
              <div className="max-w-7xl mx-auto w-full relative z-20 flex flex-col md:flex-row items-center gap-20">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-red-600/20 blur-[80px] rounded-full group-hover:bg-red-600/40 transition-all duration-1000"></div>
                  <img src={movies[0].image} className="relative w-64 md:w-[460px] rounded-[3.5rem] shadow-2xl border border-white/10 transform -rotate-2 hover:rotate-0 transition-all duration-700" alt="poster" />
                </div>
                
                <div className="text-center md:text-left flex-1">
                  <div className="inline-flex items-center gap-2 bg-red-600 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-8 shadow-[0_0_20px_rgba(220,38,38,0.5)]">
                    <Star size={12} fill="white"/> HIT TYGODNIA
                  </div>
                  <h1 className="text-6xl md:text-[10rem] font-black italic uppercase leading-[0.85] tracking-tighter mb-12 drop-shadow-2xl">
                    DIUNA:<br/>CZĘŚĆ DRUGA
                  </h1>
                  <div className="flex flex-wrap justify-center md:justify-start gap-5">
                    <button onClick={() => { setSelectedMovie(movies[0]); setSelectedTime("14:30"); }} className="bg-white text-black px-12 py-6 rounded-[2rem] font-black uppercase text-sm tracking-[0.2em] hover:bg-red-600 hover:text-white transition-all hover:scale-105 active:scale-95 shadow-2xl flex items-center gap-3">
                      <Ticket size={20} className="fill-current" /> REZERWUJ TERAZ
                    </button>
                    <button className="bg-white/5 backdrop-blur-md text-white border border-white/20 px-10 py-6 rounded-[2rem] font-black uppercase text-sm tracking-[0.2em] hover:bg-white/10 transition-all flex items-center gap-3 group">
                      <Play size={20} className="group-hover:text-red-600" /> ZWIASTUN
                    </button>
                  </div>
                </div>
              </div>
            </header>

            {/* LISTA DZISIAJ */}
            <section className="max-w-7xl mx-auto px-8 py-32">
              <div className="flex items-center gap-6 mb-20">
                <div className="w-20 h-1.5 bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)]"></div>
                <h2 className="text-5xl font-black uppercase italic tracking-tighter">DZISIAJ W <span className="text-red-600">{currentCity}</span></h2>
              </div>
              <div className="grid gap-16">
                {movies.map(movie => (
                  <div key={movie.id} className="bg-[#111]/50 rounded-[3rem] p-10 flex flex-col md:flex-row items-center gap-12 border border-white/5 hover:border-white/20 transition-all group backdrop-blur-sm">
                    <div className="relative shrink-0">
                       <img src={movie.image} className="w-52 h-72 object-cover rounded-[2rem] shadow-2xl group-hover:scale-105 transition-transform duration-500" alt={movie.title} />
                       <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md p-2 rounded-xl border border-white/10">
                          <Star size={16} fill="#eab308" className="text-yellow-500" />
                       </div>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-6">
                        {movie.tags.map(tag => <span key={tag} className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">{tag}</span>)}
                        <span className="text-gray-500 font-black text-[10px] uppercase tracking-widest flex items-center gap-2 ml-4"><Clock size={12}/> {movie.duration}</span>
                      </div>
                      <h3 className="text-5xl md:text-7xl font-black uppercase italic mb-10 tracking-tighter leading-none group-hover:text-red-600 transition-colors">{movie.title}</h3>
                      <div className="flex flex-wrap justify-center md:justify-start gap-4">
                        {movie.showtimes.map(time => (
                          <button key={time} onClick={() => { setSelectedMovie(movie); setSelectedTime(time); }} className="px-10 py-4 bg-[#1a1a1a] rounded-2xl font-black text-xs hover:bg-red-600 transition-all border border-white/5 hover:shadow-[0_10px_20px_rgba(220,38,38,0.3)] tracking-[0.2em]">
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* PROMOCJE */}
        {activeTab === 'promocje' && (
          <section className="max-w-7xl mx-auto px-8 py-32 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h2 className="text-7xl font-black uppercase italic mb-20 text-center tracking-tighter">OFERTY <span className="text-red-600">SPECJALNE</span></h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "HAPPY HOURS", desc: "CODZIENNIE DO 13:00", price: "-50% NA BILETY", icon: <Clock size={48}/>, color: "from-red-500 via-red-600 to-red-900" },
                { title: "TANIE WTORKI", desc: "BILETY 2D ZA 19.00 ZŁ", price: "CAŁY DZIEŃ", icon: <Percent size={48}/>, color: "from-orange-500 via-orange-600 to-orange-900" },
                { title: "DLA RODZINY", desc: "DLA GRUP MIN. 4 OSOBY", price: "ZNIŻKA -25%", icon: <Gift size={48}/>, color: "from-blue-500 via-blue-600 to-blue-900" },
                { title: "KARTA KINOMANA", desc: "ZBIERAJ PUNKTY ZA FILMY", price: "10-TY BILET FREE", icon: <CreditCard size={48}/>, color: "from-purple-500 via-purple-600 to-purple-900" },
                { title: "URODZINY", desc: "W DNIU TWOICH URODZIN", price: "BILET ZA 1 ZŁ", icon: <Star size={48}/>, color: "from-green-500 via-green-600 to-green-900" },
                { title: "STUDENT", desc: "Z WAŻNĄ LEGITYMACJĄ", price: "STAŁA CENA 22 ZŁ", icon: <Info size={48}/>, color: "from-pink-500 via-pink-600 to-pink-900" }
              ].map((promo, i) => (
                <div key={i} className={`group relative bg-gradient-to-br ${promo.color} p-12 rounded-[3.5rem] shadow-2xl overflow-hidden hover:scale-[1.03] transition-all duration-500 cursor-pointer`}>
                  <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:rotate-12 duration-700">{promo.icon}</div>
                  <div className="relative z-10">
                    <h3 className="text-4xl font-black uppercase italic mb-3 leading-none">{promo.title}</h3>
                    <p className="text-[10px] font-black opacity-60 mb-8 tracking-[0.3em]">{promo.desc}</p>
                    <div className="text-3xl font-black uppercase italic border-t border-white/20 pt-6">{promo.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CENNIK */}
        {activeTab === 'cennik' && (
          <section className="max-w-7xl mx-auto px-8 py-32 animate-in fade-in slide-in-from-bottom-8 duration-700">
             <h2 className="text-7xl font-black uppercase italic mb-24 text-center tracking-tighter">CENNIK <span className="text-red-600">BILETÓW</span></h2>
             <div className="grid md:grid-cols-2 gap-10">
                {movies.map(movie => (
                  <div key={movie.id} 
                    style={{ '--hover-color': movie.color }}
                    className="group relative bg-[#111] p-12 rounded-[3.5rem] border border-white/5 flex gap-10 items-center overflow-hidden transition-all duration-700 grayscale hover:grayscale-0 hover:border-white/20 hover:scale-[1.02]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[var(--hover-color)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <img src={movie.image} className="w-36 h-52 object-cover rounded-2xl shadow-2xl relative z-10" alt="" />
                    <div className="flex-1 space-y-6 relative z-10">
                       <h3 className="text-3xl font-black uppercase italic tracking-tighter border-b border-white/10 pb-4">{movie.title}</h3>
                       <div className="space-y-3">
                         <div className="flex justify-between items-center text-[12px] font-black uppercase tracking-widest">
                            <span className="text-gray-500 group-hover:text-gray-300 uppercase">Normalny</span> 
                            <span className="text-2xl italic group-hover:text-red-500 transition-colors">{movie.prices.normal} ZŁ</span>
                         </div>
                         <div className="flex justify-between items-center text-[12px] font-black uppercase tracking-widest">
                            <span className="text-gray-500 group-hover:text-gray-300 uppercase">Ulgowy</span> 
                            <span className="text-2xl italic group-hover:text-white transition-colors">{movie.prices.student} ZŁ</span>
                         </div>
                         <div className="flex justify-between items-center text-[12px] font-black uppercase text-red-600 pt-2">
                            <span className="flex items-center gap-2"><Clock size={14}/> HAPPY HOURS</span> 
                            <span className="text-2xl font-black italic">{movie.prices.happy} ZŁ</span>
                         </div>
                       </div>
                    </div>
                  </div>
                ))}
             </div>
          </section>
        )}
      </div>

      {/* BOOKING MODAL */}
      {selectedMovie && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setSelectedMovie(null)}></div>
          <div className="relative bg-[#0d0d0d] w-full max-w-5xl rounded-[4rem] border border-white/10 overflow-hidden flex flex-col md:flex-row shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="md:w-80 bg-black/40 p-12 border-r border-white/5 flex flex-col">
              <img src={selectedMovie.image} className="w-full rounded-[2.5rem] mb-10 shadow-2xl" alt="poster" />
              <h3 className="text-3xl font-black uppercase italic mb-2 tracking-tighter leading-none">{selectedMovie.title}</h3>
              <p className="text-red-600 font-black text-sm uppercase tracking-[0.2em] mb-10">{selectedTime} | Sala 4</p>
              <div className="mt-auto space-y-5 pt-10 border-t border-white/5">
                <div className="flex justify-between text-[11px] font-black uppercase text-gray-500 tracking-widest">
                  <span>MIEJSCA:</span> <span className="text-white">{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'brak'}</span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-[11px] font-black uppercase text-gray-500 tracking-widest mb-1 text-xs">Suma:</span>
                  <span className="text-4xl font-black text-red-600">{(selectedSeats.length * selectedMovie.prices.normal).toFixed(2)} zł</span>
                </div>
                <button className="w-full py-6 bg-red-600 rounded-2xl font-black uppercase tracking-[0.2em] text-[12px] hover:bg-red-500 transition-all active:scale-95 shadow-lg">
                  ZAPŁAĆ TERAZ
                </button>
              </div>
            </div>

            <div className="flex-1 p-16">
              <div className="flex justify-between items-center mb-16">
                <h4 className="text-2xl font-black uppercase italic tracking-widest">WYBIERZ <span className="text-red-600">MIEJSCA</span></h4>
                <button onClick={() => setSelectedMovie(null)} className="p-3 bg-white/5 hover:bg-red-600 rounded-full text-white transition-all"><X/></button>
              </div>
              <div className="relative mb-28">
                <div className="w-full h-2 bg-gradient-to-r from-transparent via-red-600 to-transparent rounded-full shadow-[0_10px_30px_rgba(220,38,38,0.6)]"></div>
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-[11px] font-black text-gray-700 tracking-[1.2em] uppercase">EKRAN</div>
              </div>
              <div className="flex flex-col gap-4 items-center">
                {[1, 2, 3, 4, 5, 6].map(row => (
                  <div key={row} className="flex gap-4 items-center">
                    <span className="w-6 text-[10px] font-black text-gray-800 text-center uppercase">{row}</span>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(seat => {
                      const id = `${row}-${seat}`;
                      const isSelected = selectedSeats.includes(id);
                      return (
                        <button key={id} onClick={() => toggleSeat(id)} className={`w-8 h-10 rounded-t-xl transition-all flex items-center justify-center ${isSelected ? 'bg-red-600 shadow-[0_0_20px_rgba(220,38,38,0.6)]' : 'bg-[#1a1a1a] hover:bg-[#333]'}`}>
                          <Armchair size={14} className={isSelected ? 'text-white' : 'text-gray-800'} />
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-black py-24 border-t border-white/5 text-center mt-32 px-8">
        <span className="text-3xl font-black italic tracking-tighter uppercase">CINE<span className="text-red-600">FLEX</span></span>
        <div className="mt-16 text-[10px] font-black text-gray-800 uppercase tracking-[0.6em] italic">
           <p>© 2026 CineFlex Premium | Najlepsze wrażenia filmowe</p>
        </div>
      </footer>
    </div>
  );
}

export default App;