const testimonials = [
  {
    name: 'Sarah Thompson',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    role: 'Verified Buyer',
    review:
      'SkyOne makes online shopping effortless and fun! Fast delivery and great support.',
    rating: 5,
  },
  {
    name: 'James Ochieng',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
    role: 'Electronics Enthusiast',
    review:
      'The quality of products is excellent. I love how clean and professional the site feels.',
    rating: 4,
  },
  {
    name: 'Amina Yusuf',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    role: 'Fashion Blogger',
    review:
      'Love the new arrivals section. I always find something trendy and affordable!',
    rating: 5,
  },
];

const CustomerTestimonials: React.FC = () => (
  <section className="px-6 py-10 text-center">
    <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-10">
      What Our Customers Say
    </h2>

    <div className="grid gap-6 md:grid-cols-3">
      {testimonials.map((t, idx) => (
        <div
          key={idx}
          className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-transparent shadow-sm hover:shadow-md transition duration-300"
        >
          <div className="flex items-center gap-4 mb-4">
            <img
              src={t.avatar}
              alt={t.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-green-500"
            />
            <div className="text-left">
              <p className="font-medium text-gray-900 dark:text-gray-100">{t.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t.role}</p>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-300 italic mb-3">“{t.review}”</p>

          <div className="flex">
            {Array.from({ length: t.rating }).map((_, i) => (
              <svg
                key={i}
                className="w-5 h-5 text-yellow-400 fill-current"
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.954L10 0l2.951 5.956 6.561.954-4.756 4.635 1.122 6.545z" />
              </svg>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default CustomerTestimonials;
