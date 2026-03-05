import React, { useState, useMemo } from 'react';
import { Ticket, Star, MapPin, X, Armchair, ChevronDown, Percent, Info, Gift, CreditCard, Clock, Play, Search, Filter, Calendar, ShoppingCart, Trash2, CheckCircle, Film, Coffee, Tag, LayoutGrid } from 'lucide-react';

const snacks = [
  { id: 'p1', title: "SOLONY POPCORN", price: 24, size: "L", category: "Snacks", image: "https://images.unsplash.com/photo-1572177191856-3cde618dee1f?q=80&w=500&auto=format&fit=crop" },
  { id: 'p2', title: "KARMELOWY POPCORN", price: 26, size: "L", category: "Snacks", image: "https://frankodkuchni.pl/wp-content/uploads/2022/12/image2-4-scaled.jpeg" },
  { id: 'p3', title: "NACHOS SUPREME", price: 28, size: "XL", category: "Snacks", image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?q=80&w=500&auto=format&fit=crop" },
  { id: 'p4', title: "NACHOS SEROWE", price: 25, size: "M", category: "Snacks", image: "https://images.unsplash.com/photo-1582169505937-b9992bd01ed9?q=80&w=500&auto=format&fit=crop" },
  { id: 'p5', title: "HOT DOG CLASSIC", price: 18, size: "1 SZT", category: "Hot", image: "https://images.unsplash.com/photo-1612392062631-94dd858cba88?q=80&w=500&auto=format&fit=crop" },
  { id: 'p6', title: "CZEKOLADA M&M'S", price: 15, size: "200G", category: "Sweets", image: "https://delio.com.pl/_next/image?url=https%3A%2F%2Fimages.prod.lait.app%2Fpim_prod%2Fproduct-images%2Ff_0_c_0_f0c0cbef18f573cc00b647e5c567ea724a0d5e93_bb_77938c5e41705a809e75738e655403f4-large.png&w=1920&q=75" },
  { id: 'p7', title: "COCA-COLA ICE", price: 15, size: "0.5L", category: "Drinks", image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?q=80&w=500&auto=format&fit=crop" },
  { id: 'p8', title: "FANTA ORANGE", price: 15, size: "0.5L", category: "Drinks", image: "https://images.unsplash.com/photo-1624517452488-04869289c4ca?q=80&w=500&auto=format&fit=crop" },
  { id: 'p9', title: "ZESTAW DLA DWOJGA", price: 55, size: "COMBO", category: "Sets", image: "https://images.unsplash.com/photo-1585647347384-2593bc35786b?q=80&w=500&auto=format&fit=crop" },
  { id: 'p10', title: "MEGA RODZINNY", price: 89, size: "XXL", category: "Sets", image: "https://images.unsplash.com/photo-1590189182193-1fd44f2b4048?q=80&w=500&auto=format&fit=crop" }
];

const movies = [
  { id: 1, title: "DIUNA: CZĘŚĆ DRUGA", genre: "Sci-Fi / Akcja", duration: "166 min", rating: 8.9, image: "https://image.tmdb.org/t/p/original/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg", tags: ["IMAX", "2D"], showtimes: ["14:30", "17:00", "20:45"], prices: { normal: 34, student: 28, happy: 22 }, color: "rgba(220, 38, 38, 0.3)", isComingSoon: false },
  { id: 2, title: "INTERSTELLAR", genre: "Sci-Fi / Dramat", duration: "169 min", rating: 8.7, image: "https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/430042eb-ee69-4818-aed0-a312400a26bf/600x900", tags: ["2D", "NAPISY"], showtimes: ["16:15", "19:30"], prices: { normal: 28, student: 22, happy: 18 }, color: "rgba(37, 99, 235, 0.3)", isComingSoon: false },
  { id: 3, title: "BIEDNE ISTOTY", genre: "Komedia / Sci-Fi", duration: "141 min", rating: 8.1, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS7lRfkF86FHpOdJloomCspO6uV_0kgWiCFQ&s", tags: ["2D", "NAPISY"], showtimes: ["15:00", "21:00"], prices: { normal: 28, student: 22, happy: 18 }, color: "rgba(147, 51, 234, 0.3)", isComingSoon: false },
  { id: 4, title: "OPPENHEIMER", genre: "Biograficzny / Dramat", duration: "180 min", rating: 8.6, image: "https://cdn.руни.рф/images/b/bf/%D0%9E%D0%BF%D0%BF%D0%B5%D0%BD%D0%B3%D0%B5%D0%B9%D0%BC%D0%B5%D1%80_%D1%84%D0%B8%D0%BB%D1%8C%D0%BC_%D0%BF%D0%BE%D1%81%D1%82%D0%B5%D1%80.jpg", tags: ["70MM", "IMAX"], showtimes: ["13:00", "18:00"], prices: { normal: 36, student: 30, happy: 24 }, color: "rgba(234, 179, 8, 0.3)", isComingSoon: false },
  { id: 5, title: "KUNG FU PANDA 4", genre: "Animacja / Przygodowy", duration: "94 min", rating: 7.0, image: "https://kino-zary.pl/wp-content/uploads/2024/02/xkungfu.jpg.pagespeed.ic.h_VSf9-3AP.jpg", tags: ["DUBBING", "2D"], showtimes: ["11:00", "13:15", "15:30"], prices: { normal: 26, student: 20, happy: 16 }, color: "rgba(34, 197, 94, 0.3)", isComingSoon: false },
  { id: 6, title: "THE BATMAN", genre: "Kryminał / Akcja", duration: "176 min", rating: 8.2, image: "https://m.media-amazon.com/images/I/81DGyn3r62L._AC_SL1500_.jpg", tags: ["4K", "2D"], showtimes: ["19:00", "22:15"], prices: { normal: 30, student: 24, happy: 20 }, color: "rgba(71, 85, 105, 0.3)", isComingSoon: false },
  { id: 10, title: "CIVIL WAR", genre: "Akcja / Thriller", duration: "109 min", rating: 7.8, image: "https://www.kino-teatr.ru/movie/poster/8/8/177588/pv_213091.jpg", tags: ["2D", "NAPISY"], showtimes: ["14:00", "18:30", "21:15"], prices: { normal: 30, student: 24, happy: 20 }, color: "rgba(59, 130, 246, 0.3)", isComingSoon: false },
  { id: 11, title: "CHALLENGERS", genre: "Dramat / Sport", duration: "131 min", rating: 7.5, image: "https://yolo.ge/images/posters/posters/2333/eXJoTwrC6LOdwTK9jUYDhdnHdPbJt7.jpg", tags: ["2D", "NAPISY"], showtimes: ["16:00", "20:00"], prices: { normal: 28, student: 22, happy: 18 }, color: "rgba(236, 72, 153, 0.3)", isComingSoon: false },
  { id: 12, title: "GODZILLA X KONG", genre: "Akcja / Sci-Fi", duration: "115 min", rating: 6.7, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMk08F5Kf1NsVwf7FRI3PzRDAFiv9YttU7Gg&s", tags: ["3D", "IMAX"], showtimes: ["12:30", "15:45", "19:00"], prices: { normal: 36, student: 30, happy: 24 }, color: "rgba(16, 185, 129, 0.3)", isComingSoon: false },
  
  { id: 7, title: "JOKER: FOLIE À DEUX", genre: "Dramat / Muzyczny", duration: "138 min", rating: 0, image: "https://avatars.mds.yandex.net/get-kinopoisk-image/4716873/19a63a06-a953-4cd8-9605-7b15dd5d7d46/220x330", tags: ["PREMIERA", "2D"], showtimes: [], prices: { normal: 30, student: 24, happy: 20 }, color: "rgba(185, 28, 28, 0.3)", isComingSoon: true, releaseDate: "24 MAJA" },
  { id: 8, title: "GLADIATOR II", genre: "Akcja / Dramat", duration: "150 min", rating: 0, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ-SeDol9h853tHQ6LdMwTapBzhXdAxD3HYg&s", tags: ["IMAX", "PREMIERA"], showtimes: [], prices: { normal: 35, student: 29, happy: 24 }, color: "rgba(153, 27, 27, 0.3)", isComingSoon: true, releaseDate: "15 CZERWCA" },
  { id: 9, title: "DEADPOOL & WOLVERINE", genre: "Akcja / Komedia", duration: "127 min", rating: 0, image: "https://www.kino-teatr.ru/movie/posters/big/2/6/178962.jpg", tags: ["2D", "R-RATED"], showtimes: [], prices: { normal: 32, student: 26, happy: 21 }, color: "rgba(220, 38, 38, 0.3)", isComingSoon: true, releaseDate: "26 LIPCA" }
];

const cities = ["WARSZAWA", "KRAKÓW", "WROCŁAW", "GDAŃSK", "POZNAŃ", "ŁÓDŹ"];
const allGenres = ["Wszystkie", "Sci-Fi", "Akcja", "Dramat", "Komedia", "Animacja"];

function App() {
  const [activeTab, setActiveTab] = useState('repertuar');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [currentCity, setCurrentCity] = useState("WARSZAWA");
  const [isCityOpen, setIsCityOpen] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("Wszystkie");

  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const [isCheckoutFormOpen, setIsCheckoutFormOpen] = useState(false);
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  const toggleSeat = (id) => {
    setSelectedSeats(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const addToCart = (item) => {
    setCart(prev => [...prev, { ...item, cartId: Math.random() }]);
    if (item.type === 'ticket') {
      setSelectedMovie(null);
      setSelectedSeats([]);
    }
    setIsCartOpen(true);
  };

  const removeFromCart = (cartId) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const proceedToCheckoutForm = () => {
    setIsCartOpen(false);
    setIsCheckoutFormOpen(true);
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault(); 
    setCart([]); 
    setIsCheckoutFormOpen(false); 
    setIsCheckoutSuccess(true); 
    setFormData({ name: '', email: '', phone: '' }); 
  };

  const totalCartPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const filteredMovies = useMemo(() => {
    return movies.filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = selectedGenre === "Wszystkie" || movie.genre.includes(selectedGenre);
      return !movie.isComingSoon && matchesSearch && matchesGenre;
    });
  }, [searchQuery, selectedGenre]);

  const comingSoonMovies = movies.filter(m => m.isComingSoon);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-red-600/30 pb-24 md:pb-0">
      
      <nav className="fixed top-0 w-full z-[100] bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => setActiveTab('repertuar')}>
            <div className="w-8 h-8 md:w-11 md:h-11 bg-red-600 rounded-lg md:rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.4)] group-hover:scale-110 transition-transform">
              <Ticket className="text-white fill-current w-4 h-4 md:w-6 md:h-6" />
            </div>
            <span className="text-xl md:text-2xl font-black italic tracking-tighter uppercase">CINE<span className="text-red-600">FLEX</span></span>
          </div>

          <div className="hidden md:flex gap-10">
            {['repertuar', 'buffet', 'promocje', 'cennik'].map(tab => (
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

          <div className="flex items-center gap-3 md:gap-4">
            <button onClick={() => setIsCityOpen(!isCityOpen)} className="flex items-center gap-1 md:gap-2 bg-white/5 px-3 py-2 md:px-5 md:py-2.5 rounded-xl md:rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
              <MapPin size={12} className="text-red-600 md:w-3.5 md:h-3.5" />
              <span className="text-[9px] md:text-[11px] font-black uppercase tracking-widest hidden md:inline">{currentCity}</span>
              <span className="text-[9px] md:text-[11px] font-black uppercase tracking-widest md:hidden">{currentCity.slice(0,3)}</span>
              <ChevronDown size={10} className={isCityOpen ? 'rotate-180' : ''} />
            </button>
            
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 md:p-2.5 bg-red-600/10 text-red-500 rounded-xl border border-red-600/20 hover:bg-red-600 hover:text-white transition-all"
            >
              <ShoppingCart size={16} className="md:w-4 md:h-4" />
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 md:-top-2 md:-right-2 w-4 h-4 md:w-5 md:h-5 bg-white text-black rounded-full text-[9px] md:text-[10px] flex items-center justify-center font-bold shadow-lg">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <div className="md:hidden fixed bottom-0 left-0 w-full bg-black/90 backdrop-blur-xl border-t border-white/10 z-[90] pb-safe px-4 py-3 flex justify-between items-center">
        {[
          { id: 'repertuar', icon: <Film size={20} />, label: 'FILMY' },
          { id: 'buffet', icon: <Coffee size={20} />, label: 'BAR' },
          { id: 'promocje', icon: <Tag size={20} />, label: 'PROMO' },
          { id: 'cennik', icon: <LayoutGrid size={20} />, label: 'CENY' }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-1 w-16 transition-all ${activeTab === tab.id ? 'text-red-500 scale-110' : 'text-gray-500 hover:text-gray-300'}`}
          >
            {tab.icon}
            <span className="text-[8px] font-black tracking-widest uppercase">{tab.label}</span>
          </button>
        ))}
      </div>

      {isCityOpen && (
        <div className="fixed inset-0 z-[110] flex justify-end p-4 md:p-20 pointer-events-none mt-16 md:mt-0">
          <div className="w-full md:w-56 bg-[#111]/95 backdrop-blur-2xl border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl pointer-events-auto animate-in fade-in slide-in-from-top-5 h-fit">
            {cities.map(city => (
              <button key={city} onClick={() => { setCurrentCity(city); setIsCityOpen(false); }} className={`w-full text-center md:text-left px-6 py-4 text-xs md:text-[10px] font-black hover:bg-red-600 transition-colors uppercase tracking-widest ${currentCity === city ? 'text-red-500 bg-white/5' : 'text-gray-400'}`}>
                {city}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="pt-16 md:pt-20">
        
        {activeTab === 'repertuar' && (
          <>
            <header className="relative h-[60vh] md:min-h-[90vh] flex items-center overflow-hidden px-4 md:px-8">
               <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-black via-black/80 md:via-black/60 to-transparent z-10"></div>
               <img src={movies[0].image} className="absolute inset-0 w-full h-full object-cover opacity-40 blur-sm md:opacity-30 md:blur-md scale-105" alt="bg" />
               <div className="max-w-7xl mx-auto w-full relative z-20 flex flex-col md:flex-row items-center gap-8 md:gap-20 mt-10 md:mt-0">
                 <div className="relative group hidden md:block">
                   <div className="absolute -inset-4 bg-red-600/20 blur-[80px] rounded-full group-hover:bg-red-600/40 transition-all duration-1000"></div>
                   <img src={movies[0].image} className="relative w-64 md:w-[400px] rounded-[3.5rem] shadow-2xl border border-white/10 transform -rotate-2 hover:rotate-0 transition-all duration-700" alt="poster" />
                 </div>
                 <div className="text-center md:text-left flex-1">
                   <div className="inline-flex items-center gap-1.5 md:gap-2 bg-red-600 px-3 py-1.5 md:px-5 md:py-2 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-4 md:mb-8">
                     <Star size={10} fill="white" className="md:w-3 md:h-3"/> HIT TYGODNIA
                   </div>
                   <h1 className="text-4xl md:text-5xl lg:text-[8rem] font-black italic uppercase leading-[0.9] tracking-tighter mb-6 md:mb-12 drop-shadow-2xl">
                     DIUNA:<br className="hidden md:block"/>CZĘŚĆ DRUGA
                   </h1>
                   <div className="flex justify-center md:justify-start gap-5">
                     <button onClick={() => { setSelectedMovie(movies[0]); setSelectedTime("14:30"); }} className="bg-white text-black px-8 py-4 md:px-12 md:py-6 rounded-[2rem] font-black uppercase text-xs md:text-sm tracking-[0.2em] hover:bg-red-600 hover:text-white transition-all shadow-2xl flex items-center gap-2 md:gap-3">
                       <Ticket size={16} className="fill-current md:w-5 md:h-5" /> REZERWUJ
                     </button>
                   </div>
                 </div>
               </div>
            </header>

            <section className="py-12 md:py-24 bg-gradient-to-b from-transparent to-[#0a0a0a]">
              <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="flex items-center gap-3 mb-8 md:mb-12">
                   <Calendar className="text-red-600 w-6 h-6 md:w-8 md:h-8" />
                   <h2 className="text-2xl md:text-4xl font-black uppercase italic tracking-tighter">WKRÓTCE W <span className="text-red-600">KINIE</span></h2>
                </div>
                
                <div className="flex gap-4 md:gap-8 overflow-x-auto pb-6 md:pb-10 scrollbar-hide snap-x -mx-4 px-4 md:mx-0 md:px-0">
                  {comingSoonMovies.map(movie => (
                    <div key={movie.id} className="snap-start min-w-[220px] md:min-w-[300px] group relative">
                      <div className="relative aspect-[2/3] overflow-hidden rounded-[2rem] md:rounded-[2.5rem] border border-white/5 transition-all duration-500 md:group-hover:border-red-600/50 md:group-hover:shadow-[0_0_40px_rgba(220,38,38,0.2)]">
                        <img src={movie.image} className="w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-110 md:grayscale-[50%] md:group-hover:grayscale-0" alt="" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                        <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8">
                          <span className="text-red-600 text-[8px] md:text-[10px] font-black tracking-[0.3em] uppercase block mb-1 md:mb-2">{movie.releaseDate}</span>
                          <h3 className="text-lg md:text-2xl font-black uppercase italic leading-tight group-hover:text-red-600 transition-colors">{movie.title}</h3>
                        </div>
                        <div className="absolute top-4 right-4 md:top-6 md:right-6">
                           <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-xl border border-white/10 text-[8px] md:text-[10px] font-black uppercase tracking-widest">WKRÓTCE</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 md:px-8 pt-8 md:pt-20">
              <div className="bg-[#111]/80 backdrop-blur-2xl p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] border border-white/5 flex flex-col gap-6 md:flex-row md:gap-8 items-center justify-between">
                <div className="relative w-full md:lg:w-96 group">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-600 transition-colors w-4 h-4 md:w-5 md:h-5" />
                  <input 
                    type="text" 
                    placeholder="SZUKAJ FILMU..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 md:py-5 md:pl-16 md:pr-6 font-black uppercase text-[10px] tracking-widest focus:outline-none focus:border-red-600/50 transition-all"
                  />
                </div>
                
                <div className="flex flex-wrap justify-center gap-2 md:gap-3 w-full">
                  {allGenres.map(genre => (
                    <button 
                      key={genre}
                      onClick={() => setSelectedGenre(genre)}
                      className={`px-4 py-2 md:px-6 md:py-3 rounded-xl text-[8px] md:text-[10px] font-black uppercase tracking-widest transition-all border flex-grow md:flex-grow-0 ${selectedGenre === genre ? 'bg-red-600 border-red-600 shadow-[0_0_15px_rgba(220,38,38,0.4)]' : 'bg-white/5 border-white/5 hover:border-white/20'}`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-32">
              <div className="flex items-center gap-4 md:gap-6 mb-12 md:mb-20">
                <div className="hidden md:block w-20 h-1.5 bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)]"></div>
                <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter">REPERTUAR <span className="text-red-600 hidden md:inline">{currentCity}</span></h2>
              </div>
              
              <div className="grid gap-8 md:gap-16">
                {filteredMovies.length > 0 ? (
                  filteredMovies.map(movie => (
                    <div key={movie.id} className="bg-[#111]/50 rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 flex flex-col md:flex-row items-center md:items-stretch gap-6 md:gap-12 border border-white/5 hover:border-white/20 transition-all group backdrop-blur-sm">
                      <div className="relative shrink-0 w-[180px] md:w-52">
                         <img src={movie.image} className="w-full h-[260px] md:h-72 object-cover rounded-3xl md:rounded-[2rem] shadow-2xl group-hover:scale-105 transition-transform duration-500" alt={movie.title} />
                         <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-black/60 backdrop-blur-md p-1.5 md:p-2 rounded-lg md:rounded-xl border border-white/10">
                            <Star size={14} fill="#eab308" className="text-yellow-500" />
                         </div>
                      </div>
                      <div className="flex-1 text-center md:text-left flex flex-col justify-center">
                        <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-3 mb-4 md:mb-6">
                          {movie.tags.map(tag => <span key={tag} className="bg-white/5 border border-white/10 px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest">{tag}</span>)}
                          <span className="text-gray-500 font-black text-[8px] md:text-[10px] uppercase tracking-widest flex items-center gap-1.5 ml-2 md:ml-4"><Clock size={10} className="md:w-3 md:h-3"/> {movie.duration}</span>
                        </div>
                        <h3 className="text-3xl md:text-5xl lg:text-7xl font-black uppercase italic mb-6 md:mb-10 tracking-tighter leading-none md:group-hover:text-red-600 transition-colors">{movie.title}</h3>
                        <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4 mt-auto">
                          {movie.showtimes.map(time => (
                            <button key={time} onClick={() => { setSelectedMovie(movie); setSelectedTime(time); }} className="px-6 py-3 md:px-10 md:py-4 bg-[#1a1a1a] rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs hover:bg-red-600 transition-all border border-white/5 hover:shadow-[0_10px_20px_rgba(220,38,38,0.3)] tracking-[0.2em]">
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-16 md:py-20 bg-white/5 rounded-[2rem] md:rounded-[3rem] border border-dashed border-white/10">
                    <p className="text-gray-500 font-black uppercase text-[10px] md:text-xs tracking-widest">Nie znaleziono filmów</p>
                  </div>
                )}
              </div>
            </section>
          </>
        )}
        
        {activeTab === 'buffet' && (
          <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-32 animate-in fade-in duration-700">
            <div className="flex items-center justify-center mb-12 md:mb-20">
              <h2 className="text-4xl md:text-7xl font-black uppercase italic text-center tracking-tighter">CINE<span className="text-red-600">BUFFET</span></h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {snacks.map(item => (
                <div key={item.id} className="group bg-[#111] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-red-600/30 transition-all flex flex-col h-full">
                  <div className="h-48 md:h-56 overflow-hidden relative shrink-0">
                    <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.title} />
                    <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-black/60 backdrop-blur-md px-2 py-1 md:px-3 md:py-1 rounded-lg text-[8px] md:text-[9px] font-black tracking-widest">{item.size}</div>
                  </div>
                  
                  <div className="p-6 md:p-8 flex flex-col flex-1">
                    <div>
                      <h3 className="text-lg md:text-xl font-black uppercase italic mb-1 md:mb-2 leading-tight">{item.title}</h3>
                      <p className="text-[9px] md:text-[10px] text-gray-500 uppercase tracking-widest">{item.category}</p>
                    </div>
                    
                    <div className="flex justify-between items-center mt-auto pt-6">
                      <span className="text-xl md:text-2xl font-black text-red-600">{item.price} ZŁ</span>
                      <button 
                        onClick={() => addToCart({ ...item, type: 'snack' })}
                        className="p-3 md:p-4 bg-white/5 hover:bg-red-600 rounded-xl md:rounded-2xl transition-all active:scale-95"
                      >
                        <ShoppingCart size={16} className="md:w-4 md:h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'promocje' && (
          <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-32 animate-in fade-in duration-700">
            <h2 className="text-4xl md:text-7xl font-black uppercase italic mb-12 md:mb-20 text-center tracking-tighter">OFERTY <span className="text-red-600">SPECJALNE</span></h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[
                { title: "HAPPY HOURS", desc: "CODZIENNIE DO 13:00", price: "-50% NA BILETY", icon: <Clock size={40}/>, color: "from-red-500 via-red-600 to-red-900" },
                { title: "TANIE WTORKI", desc: "BILETY 2D ZA 19.00 ZŁ", price: "CAŁY DZIEŃ", icon: <Percent size={40}/>, color: "from-orange-500 via-orange-600 to-orange-900" },
                { title: "DLA RODZINY", desc: "DLA GRUP MIN. 4 OSOBY", price: "ZNIŻKA -25%", icon: <Gift size={40}/>, color: "from-blue-500 via-blue-600 to-blue-900" },
                { title: "KARTA KINOMANA", desc: "ZBIERAJ PUNKTY", price: "10-TY BILET FREE", icon: <CreditCard size={40}/>, color: "from-purple-500 via-purple-600 to-purple-900" },
                { title: "URODZINY", desc: "W DNIU TWOICH URODZIN", price: "BILET ZA 1 ZŁ", icon: <Star size={40}/>, color: "from-green-500 via-green-600 to-green-900" },
                { title: "STUDENT", desc: "Z WAŻNĄ LEGITYMACJĄ", price: "STAŁA CENA 22 ZŁ", icon: <Info size={40}/>, color: "from-pink-500 via-pink-600 to-pink-900" }
              ].map((promo, i) => (
                <div key={i} className={`group relative bg-gradient-to-br ${promo.color} p-8 md:p-12 rounded-[2rem] md:rounded-[3.5rem] shadow-2xl overflow-hidden md:hover:scale-[1.03] transition-all duration-500`}>
                  <div className="absolute top-0 right-0 p-6 md:p-10 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:rotate-12 duration-700">{promo.icon}</div>
                  <div className="relative z-10">
                    <h3 className="text-2xl md:text-4xl font-black uppercase italic mb-2 md:mb-3 leading-none">{promo.title}</h3>
                    <p className="text-[9px] md:text-[10px] font-black opacity-60 mb-6 md:mb-8 tracking-[0.3em]">{promo.desc}</p>
                    <div className="text-xl md:text-3xl font-black uppercase italic border-t border-white/20 pt-4 md:pt-6">{promo.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'cennik' && (
          <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-32 animate-in fade-in duration-700">
             <h2 className="text-4xl md:text-7xl font-black uppercase italic mb-12 md:mb-24 text-center tracking-tighter">CENNIK <span className="text-red-600">BILETÓW</span></h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                {movies.filter(m => !m.isComingSoon).map(movie => (
                  <div key={movie.id} 
                    style={{ '--hover-color': movie.color }}
                    className="group relative bg-[#111] p-6 md:p-12 rounded-[2rem] md:rounded-[3.5rem] border border-white/5 flex gap-6 md:gap-10 items-center overflow-hidden transition-all duration-700 md:grayscale md:hover:grayscale-0 md:hover:border-white/20 md:hover:scale-[1.02]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[var(--hover-color)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <img src={movie.image} className="w-24 h-36 md:w-36 md:h-52 object-cover rounded-xl md:rounded-2xl shadow-2xl relative z-10" alt="" />
                    <div className="flex-1 space-y-4 md:space-y-6 relative z-10">
                       <h3 className="text-xl md:text-3xl font-black uppercase italic tracking-tighter border-b border-white/10 pb-3 md:pb-4">{movie.title}</h3>
                       <div className="space-y-2 md:space-y-3">
                         <div className="flex justify-between items-center text-[10px] md:text-[12px] font-black uppercase tracking-widest">
                            <span className="text-gray-500 group-hover:text-gray-300 uppercase">Normalny</span> 
                            <span className="text-lg md:text-2xl italic group-hover:text-red-500 transition-colors">{movie.prices.normal} ZŁ</span>
                         </div>
                         <div className="flex justify-between items-center text-[10px] md:text-[12px] font-black uppercase tracking-widest">
                            <span className="text-gray-500 group-hover:text-gray-300 uppercase">Ulgowy</span> 
                            <span className="text-lg md:text-2xl italic group-hover:text-white transition-colors">{movie.prices.student} ZŁ</span>
                         </div>
                       </div>
                    </div>
                  </div>
                ))}
             </div>
          </section>
        )}
      </div>

      {selectedMovie && (
        <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center md:p-4">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setSelectedMovie(null)}></div>
          <div className="relative bg-[#0d0d0d] w-full md:max-w-5xl h-[90vh] md:h-auto rounded-t-[2.5rem] md:rounded-[4rem] border-t md:border border-white/10 overflow-hidden flex flex-col md:flex-row shadow-2xl animate-in slide-in-from-bottom-full md:zoom-in-95 duration-300">
            
            <button onClick={() => setSelectedMovie(null)} className="absolute top-4 right-4 md:hidden p-2 bg-white/10 rounded-full z-10"><X size={20}/></button>

            <div className="md:w-80 bg-black/40 p-6 md:p-12 border-b md:border-b-0 md:border-r border-white/5 flex flex-row md:flex-col gap-6 md:gap-0 shrink-0">
              <img src={selectedMovie.image} className="w-24 h-36 md:w-full object-cover rounded-2xl md:rounded-[2.5rem] md:mb-10 shadow-2xl hidden md:block" alt="poster" />
              <div className="flex-1 flex flex-col justify-center md:block">
                <h3 className="text-xl md:text-3xl font-black uppercase italic mb-1 md:mb-2 tracking-tighter leading-none">{selectedMovie.title}</h3>
                <p className="text-red-600 font-black text-[10px] md:text-sm uppercase tracking-[0.2em] mb-4 md:mb-10">{selectedTime} | Sala 4</p>
                <div className="md:mt-auto space-y-3 md:space-y-5 pt-0 md:pt-10 md:border-t border-white/5 hidden md:block">
                  <div className="flex justify-between text-[11px] font-black uppercase text-gray-500 tracking-widest">
                    <span>MIEJSCA:</span> <span className="text-white truncate max-w-[120px] text-right">{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'brak'}</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-[11px] font-black uppercase text-gray-500 tracking-widest mb-1">Suma:</span>
                    <span className="text-3xl md:text-4xl font-black text-red-600">{(selectedSeats.length * selectedMovie.prices.normal).toFixed(2)} zł</span>
                  </div>
                  <button 
                    onClick={() => addToCart({
                      id: selectedMovie.id,
                      title: `${selectedMovie.title} (${selectedSeats.length} os.)`,
                      price: selectedSeats.length * selectedMovie.prices.normal,
                      image: selectedMovie.image,
                      type: 'ticket'
                    })}
                    disabled={selectedSeats.length === 0}
                    className={`w-full py-4 md:py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] md:text-[12px] transition-all active:scale-95 shadow-lg ${selectedSeats.length > 0 ? 'bg-red-600 hover:bg-red-500' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
                  >
                    {selectedSeats.length > 0 ? 'DODAJ DO KOSZYKA' : 'WYBIERZ MIEJSCA'}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex-1 p-4 md:p-16 flex flex-col overflow-y-auto">
              <div className="flex justify-between items-center mb-8 md:mb-16 hidden md:flex">
                <h4 className="text-2xl font-black uppercase italic tracking-widest">WYBIERZ <span className="text-red-600">MIEJSCA</span></h4>
                <button onClick={() => setSelectedMovie(null)} className="p-3 bg-white/5 hover:bg-red-600 rounded-full text-white transition-all"><X/></button>
              </div>
              
              <div className="relative mb-12 md:mb-28 mt-4 md:mt-0 px-4 md:px-0">
                <div className="w-full h-1 md:h-2 bg-gradient-to-r from-transparent via-red-600 to-transparent rounded-full shadow-[0_5px_20px_rgba(220,38,38,0.6)]"></div>
                <div className="absolute -top-6 md:-top-10 left-1/2 -translate-x-1/2 text-[9px] md:text-[11px] font-black text-gray-700 tracking-[0.8em] md:tracking-[1.2em] uppercase">EKRAN</div>
              </div>
              
              <div className="flex flex-col gap-3 md:gap-4 items-center overflow-x-auto pb-4 px-2 scrollbar-hide">
                <div className="min-w-max flex flex-col gap-3 md:gap-4">
                  {[1, 2, 3, 4, 5, 6, 7].map(row => (
                    <div key={row} className="flex gap-2 md:gap-4 items-center">
                      <span className="w-4 md:w-6 text-[8px] md:text-[10px] font-black text-gray-600 text-center uppercase">{row}</span>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(seat => {
                        const id = `${row}-${seat}`;
                        const isSelected = selectedSeats.includes(id);
                        return (
                          <button key={id} onClick={() => toggleSeat(id)} className={`w-7 h-8 md:w-8 md:h-10 rounded-t-lg md:rounded-t-xl transition-all flex items-center justify-center ${isSelected ? 'bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.6)]' : 'bg-[#1a1a1a] hover:bg-[#333]'}`}>
                            <Armchair size={12} className={isSelected ? 'text-white' : 'text-gray-800'} />
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-auto md:hidden pt-4 border-t border-white/5 space-y-3 bg-[#0d0d0d] sticky bottom-0">
                  <div className="flex justify-between items-end">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black uppercase text-gray-500 tracking-widest">Suma ({selectedSeats.length} szt):</span>
                      <span className="text-2xl font-black text-red-600">{(selectedSeats.length * selectedMovie.prices.normal).toFixed(2)} zł</span>
                    </div>
                    <button 
                      onClick={() => addToCart({
                        id: selectedMovie.id,
                        title: `${selectedMovie.title} (${selectedSeats.length} os.)`,
                        price: selectedSeats.length * selectedMovie.prices.normal,
                        image: selectedMovie.image,
                        type: 'ticket'
                      })}
                      disabled={selectedSeats.length === 0}
                      className={`px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all active:scale-95 shadow-lg ${selectedSeats.length > 0 ? 'bg-red-600 hover:bg-red-500 text-white' : 'bg-gray-800 text-gray-500'}`}
                    >
                      DODAJ DO KOSZYKA
                    </button>
                  </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isCartOpen && (
        <div className="fixed inset-0 z-[300] flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          <div className="relative w-full md:max-w-md bg-[#0d0d0d] h-full md:border-l border-white/10 p-6 md:p-10 flex flex-col shadow-2xl animate-in slide-in-from-right duration-500">
            <div className="flex justify-between items-center mb-8 md:mb-10 pt-4 md:pt-0">
              <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter">TWÓJ <span className="text-red-600">KOSZYK</span></h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:text-red-600 transition-colors bg-white/5 rounded-full md:bg-transparent md:rounded-none"><X size={20}/></button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 md:space-y-6 pr-2 scrollbar-hide">
              {cart.length === 0 ? (
                <div className="text-center py-20 opacity-20 flex flex-col items-center">
                  <ShoppingCart size={48} className="mb-4" />
                  <p className="font-black uppercase tracking-widest text-[10px]">Koszyk jest pusty</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.cartId} className="flex gap-4 bg-white/5 p-3 md:p-5 rounded-[1.5rem] md:rounded-[2rem] border border-white/5 group">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl overflow-hidden shrink-0">
                      <img src={item.image} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <span className="text-[8px] md:text-[9px] text-gray-500 uppercase tracking-widest mb-1">{item.type === 'ticket' ? 'Bilet' : 'Przekąska'}</span>
                      <h4 className="text-[10px] md:text-xs font-black uppercase tracking-wider leading-tight">{item.title}</h4>
                      <p className="text-red-600 font-black text-sm md:text-lg mt-1">{item.price} ZŁ</p>
                    </div>
                    <button onClick={() => removeFromCart(item.cartId)} className="self-center p-2 md:p-3 rounded-lg md:rounded-xl bg-white/5 text-gray-500 hover:text-red-600 hover:bg-red-600/10 transition-all">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="pt-6 md:pt-10 border-t border-white/10 mt-6 md:mt-10 pb-safe md:pb-0">
              <div className="flex justify-between items-end mb-6 md:mb-8">
                <span className="text-gray-500 font-black uppercase text-[9px] md:text-[10px] tracking-widest">Suma całkowita:</span>
                <span className="text-3xl md:text-4xl font-black text-red-600">{totalCartPrice.toFixed(2)} ZŁ</span>
              </div>
              <button 
                onClick={proceedToCheckoutForm}
                disabled={cart.length === 0}
                className={`w-full py-5 md:py-6 rounded-[1.5rem] md:rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs md:text-sm transition-all shadow-lg ${cart.length > 0 ? 'bg-red-600 hover:bg-red-500 shadow-red-600/20 active:scale-95' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
              >
                KASA
              </button>
            </div>
          </div>
        </div>
      )}

      {isCheckoutFormOpen && (
        <div className="fixed inset-0 z-[400] flex items-end md:items-center justify-center md:p-4">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setIsCheckoutFormOpen(false)}></div>
          <div className="relative bg-[#111] w-full md:max-w-md p-8 md:p-12 rounded-t-[2.5rem] md:rounded-[3rem] border-t md:border border-white/10 shadow-2xl animate-in slide-in-from-bottom-full md:zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter">TWOJE <span className="text-red-600">DANE</span></h2>
              <button onClick={() => setIsCheckoutFormOpen(false)} className="p-2 hover:text-red-600 transition-colors bg-white/10 rounded-full md:bg-transparent"><X size={18}/></button>
            </div>
            
            <form onSubmit={handleFinalSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label className="block text-[9px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 pl-2">Imię i nazwisko</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl py-3 md:py-4 px-4 md:px-6 font-bold text-xs md:text-sm focus:outline-none focus:border-red-600/50 transition-all placeholder:text-gray-700 text-white" placeholder="Jan Kowalski" />
              </div>
              <div>
                <label className="block text-[9px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 pl-2">Adres E-mail</label>
                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl py-3 md:py-4 px-4 md:px-6 font-bold text-xs md:text-sm focus:outline-none focus:border-red-600/50 transition-all placeholder:text-gray-700 text-white" placeholder="jan@example.com" />
              </div>
              <div>
                <label className="block text-[9px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 pl-2">Numer telefonu</label>
                <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl py-3 md:py-4 px-4 md:px-6 font-bold text-xs md:text-sm focus:outline-none focus:border-red-600/50 transition-all placeholder:text-gray-700 text-white" placeholder="+48 000 000 000" />
              </div>
              
              <div className="pt-4 md:pt-6 border-t border-white/10 mt-6 md:mt-8 pb-safe md:pb-0">
                <button type="submit" className="w-full py-4 md:py-5 bg-red-600 rounded-xl md:rounded-2xl font-black uppercase tracking-[0.2em] text-xs md:text-sm hover:bg-red-500 transition-all active:scale-95 shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                  ZAPŁAĆ {totalCartPrice.toFixed(2)} ZŁ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isCheckoutSuccess && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setIsCheckoutSuccess(false)}></div>
          <div className="relative bg-[#111] p-10 md:p-16 rounded-[2rem] md:rounded-[3rem] border border-white/10 text-center animate-in zoom-in-95 duration-500 max-w-sm md:max-w-lg w-full shadow-2xl">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
              <CheckCircle size={40} className="md:w-12 md:h-12" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black italic uppercase mb-3 md:mb-4 text-white">SUKCES!</h2>
            <p className="text-gray-400 font-black uppercase text-[9px] md:text-xs tracking-widest mb-8 md:mb-10 leading-relaxed">
              Twoje zamówienie zostało potwierdzone.<br/>Bilety i przekąski czekają na mailu.
            </p>
            <button onClick={() => setIsCheckoutSuccess(false)} className="w-full py-4 md:py-5 bg-white/10 hover:bg-red-600 text-white rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-[10px] md:text-xs transition-all">
              WRÓĆ DO KINA
            </button>
          </div>
        </div>
      )}

      <footer className="bg-black py-16 md:py-24 border-t border-white/5 text-center mt-16 md:mt-32 px-4 md:px-8 mb-16 md:mb-0">
        <span className="text-2xl md:text-3xl font-black italic tracking-tighter uppercase">CINE<span className="text-red-600">FLEX</span></span>
        <div className="mt-8 md:mt-16 text-[8px] md:text-[10px] font-black text-gray-800 uppercase tracking-[0.4em] md:tracking-[0.6em] italic">
            <p>© 2026 CineFlex Premium | All rights reserved</p>
        </div>
      </footer>
    </div>
  );
}

export default App;