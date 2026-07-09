import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { CheckCircle, PlayCircle, Quote, Search, Sparkles, Star, Video } from "lucide-react";
import { getPublicTestimonials, resolveMediaUrl, Testimonial } from "../services/testimonialService";
import "./TestimonialsPage.css";

const Stars = ({ rating, size = 16 }: { rating: number; size?: number }) => (
  <div style={{ display: "flex", gap: 2 }}>
    {[1, 2, 3, 4, 5].map((value) => (
      <Star
        key={value}
        style={{
          width: size,
          height: size,
          fill: value <= rating ? "#E6922E" : "transparent",
          stroke: value <= rating ? "#E6922E" : "#D1D5DB",
          strokeWidth: 2,
        }}
      />
    ))}
  </div>
);

const initialsOf = (name?: string) =>
  (name || "Student")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [ratingFilter, setRatingFilter] = useState<"all" | number>("all");

  useEffect(() => {
    getPublicTestimonials()
      .then(setTestimonials)
      .finally(() => setLoading(false));
  }, []);

  const ratedTestimonials = testimonials.filter((item) => item.rating);
  const averageRating = ratedTestimonials.length
    ? ratedTestimonials.reduce((sum, item) => sum + (item.rating || 0), 0) / ratedTestimonials.length
    : 0;
  const recommendPercent = ratedTestimonials.length
    ? Math.round((ratedTestimonials.filter((item) => (item.rating || 0) >= 4).length / ratedTestimonials.length) * 100)
    : null;

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
      const matchesRating = ratingFilter === "all" || item.rating === ratingFilter;
      const searchText = `${item.user?.name || ""} ${item.course?.title || ""} ${item.text}`.toLowerCase();
      return matchesRating && (!normalizedQuery || searchText.includes(normalizedQuery));
    });
  }, [query, ratingFilter, testimonials]);

  return (
    <div>
      {/* Hero */}
      <section className="tp-hero">
        <div className="tp-hero-glow tp-hero-glow--tr" aria-hidden />
        <div className="tp-hero-glow tp-hero-glow--bl" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <span className="tp-badge">
            <Sparkles className="h-4 w-4" /> Learner Experience
          </span>
          <h1 className="tp-title">Real Stories, Real Growth</h1>
          <p className="tp-subtitle">
            Verified feedback from learners who completed our training courses — in their own words.
          </p>

          {!loading && testimonials.length > 0 && (
            <div className="tp-stats mt-10 mx-auto" style={{ maxWidth: "28rem" }}>
              <div>
                <p className="tp-stat-num">{averageRating ? averageRating.toFixed(1) : "—"}</p>
                <p className="tp-stat-label">Avg. rating</p>
              </div>
              <div>
                <p className="tp-stat-num">{testimonials.length}</p>
                <p className="tp-stat-label">{testimonials.length === 1 ? "Review" : "Reviews"}</p>
              </div>
              <div>
                <p className="tp-stat-num">{recommendPercent !== null ? `${recommendPercent}%` : "—"}</p>
                <p className="tp-stat-label">Recommend</p>
              </div>
            </div>
          )}
        </div>
      </section>

      <main className="tp-container px-4 py-16">
        {loading ? (
          <>
            <div className="tp-skel-summary">
              <div className="tp-skel" style={{ width: 96, height: 56 }} />
              <div className="tp-skel" style={{ width: 140, height: 22, marginTop: "1rem" }} />
              <div className="tp-skel" style={{ width: 110, height: 14, marginTop: "0.75rem" }} />
            </div>

            <div className="tp-skel-filters">
              <div className="tp-skel" style={{ width: 220, height: 44, borderRadius: 9999 }} />
              <div className="tp-skel" style={{ width: 64, height: 44, borderRadius: 9999 }} />
              <div className="tp-skel" style={{ width: 64, height: 44, borderRadius: 9999 }} />
              <div className="tp-skel" style={{ width: 64, height: 44, borderRadius: 9999 }} />
            </div>

            <div className="tp-grid">
              {[1, 2, 3, 4, 5, 6].map((key) => (
                <div key={key} className="tp-skel-card">
                  <div className="tp-skel" style={{ width: 28, height: 28, borderRadius: 6 }} />
                  <div className="tp-skel" style={{ width: 100, height: 14 }} />
                  <div className="tp-skel" style={{ width: "100%", height: 14 }} />
                  <div className="tp-skel" style={{ width: "70%", height: 14 }} />
                  <div className="tp-skel-footer">
                    <div className="tp-skel" style={{ width: 44, height: 44, borderRadius: 9999, flexShrink: 0 }} />
                    <div className="tp-skel-footer-text">
                      <div className="tp-skel" style={{ width: "60%", height: 12 }} />
                      <div className="tp-skel" style={{ width: "40%", height: 10 }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : testimonials.length === 0 ? (
          <div className="tp-empty" style={{ maxWidth: "28rem", marginLeft: "auto", marginRight: "auto" }}>
            <Quote className="mx-auto h-10 w-10 text-[#C9A961]" />
            <p className="mt-6 font-bold text-[#1B2A4A]">No reviews published yet</p>
            <p className="mt-1 text-sm text-gray-400">Be the first learner to complete a course and share your story.</p>
          </div>
        ) : (
          <>
            {/* Rating breakdown */}
            {ratedTestimonials.length > 0 && (
              <div className="tp-summary-card">
                <div className="tp-summary-left">
                  <p className="tp-summary-number">{averageRating.toFixed(1)}</p>
                  <div className="mt-6">
                    <Stars rating={Math.round(averageRating)} size={22} />
                  </div>
                  <p className="mt-6 text-sm font-bold text-gray-400">
                    {ratedTestimonials.length} course {ratedTestimonials.length === 1 ? "rating" : "ratings"}
                  </p>
                </div>

                <div className="flex flex-col justify-center gap-2">
                  {ratingCounts.map(({ rating, count }) => {
                    const percentage = ratedTestimonials.length ? Math.round((count / ratedTestimonials.length) * 100) : 0;
                    return (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => setRatingFilter((current) => (current === rating ? "all" : rating))}
                        className={`tp-bar-row ${ratingFilter === rating ? "is-active" : ""}`}
                      >
                        <span className="flex items-center gap-1 text-sm font-bold text-[#1B2A4A]">
                          {rating}
                          <Star style={{ width: 14, height: 14, fill: "#E6922E", stroke: "#E6922E" }} />
                        </span>
                        <span className="tp-bar-track">
                          <span className="tp-bar-fill" style={{ width: `${percentage}%` }} />
                        </span>
                        <span className="text-right text-xs font-bold text-gray-400">{percentage}%</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Filters */}
            <div className="tp-filters-row">
              <div className="tp-search-wrap">
                <Search className="tp-search-icon" style={{ width: 18, height: 18 }} />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search reviews..."
                  className="tp-search"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setRatingFilter("all")}
                  className={`tp-pill ${ratingFilter === "all" ? "is-active" : ""}`}
                >
                  ALL
                </button>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setRatingFilter((current) => (current === rating ? "all" : rating))}
                    className={`tp-pill ${ratingFilter === rating ? "is-active" : ""}`}
                  >
                    {rating}
                    <Star
                      style={{
                        width: 12,
                        height: 12,
                        fill: ratingFilter === rating ? "#fff" : "#D1D5DB",
                        stroke: ratingFilter === rating ? "#fff" : "#D1D5DB",
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Reviews */}
            {filteredTestimonials.length === 0 ? (
              <div className="tp-empty">No reviews match your search.</div>
            ) : (
              <div className="tp-grid">
                {filteredTestimonials.map((item) => (
                  <article key={item._id} className="tp-card">
                    <Quote className="tp-card-quote h-7 w-7 text-[#C9A961]" style={{ opacity: 0.35 }} />

                    {item.rating ? (
                      <div className="mt-6">
                        <Stars rating={item.rating} />
                      </div>
                    ) : null}

                    <p className="mt-6 leading-relaxed text-gray-700" style={{ whiteSpace: "pre-line" }}>
                      {item.text}
                    </p>

                    {item.videoUrl ? (
                      <div className="tp-video-wrap">
                        <div className="tp-video-badge">
                          <PlayCircle className="h-4 w-4" /> Video review
                        </div>
                        <video src={resolveMediaUrl(item.videoUrl)} controls />
                      </div>
                    ) : null}

                    <div className="tp-card-divider">
                      {item.profileImageUrl ? (
                        <img
                          src={resolveMediaUrl(item.profileImageUrl)}
                          alt=""
                          className="tp-avatar-img"
                          style={{ width: 44, height: 44 }}
                        />
                      ) : (
                        <div className="tp-avatar-fallback" style={{ width: 44, height: 44 }}>
                          {initialsOf(item.user?.name)}
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1">
                          <h3 className="truncate font-black text-[#1B2A4A]">{item.user?.name || "Student"}</h3>
                          <CheckCircle style={{ width: 14, height: 14, flexShrink: 0 }} className="text-[#C9A961]" />
                        </div>
                        <p className="truncate text-xs font-bold uppercase tracking-wide text-gray-400">
                          {item.course?.title}
                        </p>
                      </div>
                      <time className="text-xs font-semibold text-gray-400" style={{ flexShrink: 0 }}>
                        {new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </time>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* CTA */}
      <section className="tp-cta">
        <div className="tp-cta-bar" aria-hidden />
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <Video className="mx-auto text-[#C9A961]" style={{ width: 36, height: 36 }} />
          <h2 className="tp-cta-title">Have a story of your own?</h2>
          <p className="mt-6 mx-auto text-gray-400" style={{ maxWidth: "34rem" }}>
            Complete one of our training courses and share your experience — it helps future learners choose with confidence.
          </p>
          <Link to="/training" className="mt-10 inline-block">
            <button type="button" className="tp-btn-primary">
              Start a Course
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
