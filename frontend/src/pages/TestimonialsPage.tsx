import { useEffect, useMemo, useState } from "react";
import { Search, Star, Video } from "lucide-react";
import { getPublicTestimonials, resolveMediaUrl, Testimonial } from "../services/testimonialService";

const renderStars = (rating: number, size = "w-4 h-4") =>
  [1, 2, 3, 4, 5].map((value) => (
    <Star
      key={value}
      className={`${size} text-[#E6922E] ${value <= rating ? "fill-current" : "fill-transparent"}`}
    />
  ));

export function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");

  useEffect(() => {
    getPublicTestimonials()
      .then(setTestimonials)
      .finally(() => setLoading(false));
  }, []);

  const ratedTestimonials = testimonials.filter((item) => item.rating);
  const averageRating = ratedTestimonials.length
    ? ratedTestimonials.reduce((sum, item) => sum + (item.rating || 0), 0) / ratedTestimonials.length
    : 0;

  const ratingCounts = useMemo(
    () =>
      [5, 4, 3, 2, 1].map((rating) => ({
        rating,
        count: testimonials.filter((item) => item.rating === rating).length,
      })),
    [testimonials],
  );

  const filteredTestimonials = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return testimonials.filter((item) => {
      const matchesRating = ratingFilter === "all" || item.rating === Number(ratingFilter);
      const searchText = `${item.user?.name || ""} ${item.course?.title || ""} ${item.text}`.toLowerCase();
      return matchesRating && (!normalizedQuery || searchText.includes(normalizedQuery));
    });
  }, [query, ratingFilter, testimonials]);

  return (
    <div className="min-h-screen bg-white">
      <section className="border-b border-gray-100 px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-black uppercase tracking-widest text-[#C9A961]">Learner experience</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-[#1B2A4A]">Student feedback</h1>
          <p className="mt-3 max-w-2xl text-gray-500">Verified feedback from learners who completed our training courses.</p>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        {loading ? (
          <div className="py-20 text-center font-bold text-[#1B2A4A]">Loading student feedback...</div>
        ) : (
          <>
            <section className="grid gap-8 border-b border-gray-100 pb-10 lg:grid-cols-[220px_1fr]">
              <div className="flex flex-col items-center justify-center border-b border-gray-100 pb-8 text-center lg:border-b-0 lg:border-r lg:pb-0">
                <p className="text-6xl font-black text-[#1B2A4A]">{averageRating ? averageRating.toFixed(1) : "0.0"}</p>
                <div className="mt-3 flex gap-1">{renderStars(Math.round(averageRating), "w-6 h-6")}</div>
                <p className="mt-2 text-sm font-bold text-gray-500">
                  {ratedTestimonials.length} course {ratedTestimonials.length === 1 ? "rating" : "ratings"}
                </p>
              </div>

              <div className="space-y-3">
                {ratingCounts.map(({ rating, count }) => {
                  const percentage = ratedTestimonials.length ? Math.round((count / ratedTestimonials.length) * 100) : 0;
                  return (
                    <div key={rating} className="grid grid-cols-[58px_1fr_52px] items-center gap-3">
                      <div className="flex items-center gap-1 text-sm font-bold text-[#1B2A4A]">
                        {rating}<Star className="h-4 w-4 fill-current text-[#E6922E]" />
                      </div>
                      <div className="h-3 overflow-hidden rounded-sm bg-[#E8E4DC]">
                        <div className="h-full bg-[#1B2A4A]" style={{ width: `${percentage}%` }} />
                      </div>
                      <span className="text-right text-sm font-bold text-gray-500">{percentage}%</span>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="py-10">
              <h2 className="text-2xl font-black text-[#1B2A4A]">Reviews</h2>
              <div className="mt-5 grid gap-3 md:grid-cols-[1fr_210px]">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search reviews"
                    className="h-12 w-full rounded-md border border-gray-300 bg-white pl-12 pr-4 text-sm outline-none focus:border-[#1B2A4A] focus:ring-2 focus:ring-[#1B2A4A]/10"
                  />
                </div>
                <select
                  value={ratingFilter}
                  onChange={(event) => setRatingFilter(event.target.value)}
                  className="h-12 rounded-md border border-gray-300 bg-white px-4 text-sm font-bold text-[#1B2A4A] outline-none focus:border-[#1B2A4A]"
                >
                  <option value="all">All ratings</option>
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <option key={rating} value={rating}>{rating} stars</option>
                  ))}
                </select>
              </div>

              {filteredTestimonials.length === 0 ? (
                <div className="mt-10 border-t border-gray-100 py-14 text-center text-gray-500">
                  No reviews match your search.
                </div>
              ) : (
                <div className="mt-4 divide-y divide-gray-100">
                  {filteredTestimonials.map((item) => (
                    <article key={item._id} className="grid gap-4 py-7 sm:grid-cols-[56px_1fr]">
                      {item.profileImageUrl ? (
                        <img src={resolveMediaUrl(item.profileImageUrl)} alt="" className="h-14 w-14 rounded-full object-cover" />
                      ) : (
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1B2A4A] font-black text-white">
                          {(item.user?.name || "S").split(" ").map((part) => part[0]).join("").slice(0, 2)}
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <h3 className="font-black text-[#1B2A4A]">{item.user?.name || "Student"}</h3>
                            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">{item.course?.title}</p>
                          </div>
                          <time className="text-xs font-semibold text-gray-400">
                            {new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </time>
                        </div>
                        {item.rating ? <div className="mt-2 flex gap-0.5">{renderStars(item.rating)}</div> : null}
                        <p className="mt-3 max-w-4xl whitespace-pre-line leading-7 text-gray-700">{item.text}</p>
                        {item.videoUrl ? (
                          <div className="mt-4 max-w-xl">
                            <div className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#1B2A4A]">
                              <Video className="h-4 w-4" /> Video review
                            </div>
                            <video src={resolveMediaUrl(item.videoUrl)} controls className="aspect-video w-full rounded-md bg-black object-cover" />
                          </div>
                        ) : null}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}
