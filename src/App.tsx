import { useMemo, useState, useEffect } from "react";
import "./App.css";

interface BikePart {
  id: string;
  english: string;
  german: string;
  uk: string;
  category: string;
  image?: string; // optional: if set and not empty, show
}

function resolvePublicAssetPath(path: string): string {
  const base = import.meta.env.BASE_URL || "/";
  if (!path) return path;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return path.startsWith("/") ? base + path.slice(1) : base + path;
}

const BIKE_PARTS: BikePart[] = [
  // Wheels & Tires
  {
    id: "1",
    english: "Front wheel",
    german: "Vorderrad",
    uk: "Переднє колесо",
    category: "Wheels",
    image: "/front_wheel.png",
  },
  {
    id: "2",
    english: "Rear wheel",
    german: "Hinterrad",
    uk: "Заднє колесо",
    category: "Wheels",
    image: "/rear_wheel.png",
  },
  {
    id: "3",
    english: "Front tire",
    german: "Reifen (vorn)",
    uk: "Передня шина",
    category: "Wheels",
    image: "/front_tire.jpg",
  },
  {
    id: "4",
    english: "Rear tire",
    german: "Reifen (hinten)",
    uk: "Задня шина",
    category: "Wheels",
    image: "/rear_tire.jpg",
  },
  {
    id: "5",
    english: "Rim",
    german: "Felge",
    uk: "Обід",
    category: "Wheels",
    image: "/rim.jpg",
  },
  {
    id: "6",
    english: "Spoke",
    german: "Speiche",
    uk: "Спиця",
    category: "Wheels",
    image: "/spoke.png",
  },
  {
    id: "7",
    english: "Hub",
    german: "Nabe",
    uk: "Втулка",
    category: "Wheels",
    image: "/hub.jpg",
  },

  // Brakes
  {
    id: "8",
    english: "Brake lever",
    german: "Bremshebel",
    uk: "Гальмівний важіль",
    category: "Brakes",
    image: "/brake_lever.png",
  },
  {
    id: "9",
    english: "Brake caliper",
    german: "Bremssattel",
    uk: "Гальмівний супорт",
    category: "Brakes",
    image: "/brake_caliper.png",
  },
  {
    id: "10",
    english: "Brake rotor",
    german: "Bremsscheibe",
    uk: "Гальмівний диск",
    category: "Brakes",
    image: "/brake_rotor.png",
  },
  {
    id: "11",
    english: "Brake pad",
    german: "Bremsbelag",
    uk: "Гальмівна колодка",
    category: "Brakes",
    image: "/brake_pad.jpg",
  },

  // Handlebars & Controls
  {
    id: "12",
    english: "Handlebar",
    german: "Lenker",
    uk: "Кермо",
    category: "Handlebars",
    image: "/handlebar.png",
  },
  {
    id: "13",
    english: "Grip",
    german: "Griff",
    uk: "Ручка керма",
    category: "Handlebars",
    image: "/grip.jpg",
  },
  {
    id: "14",
    english: "Stem",
    german: "Vorbau",
    uk: "Винос керма",
    category: "Handlebars",
    image: "/stem.png",
  },
  {
    id: "15",
    english: "Shifter",
    german: "Schalthebel",
    uk: "Манетка",
    category: "Handlebars",
    image: "/shifter.jpg",
  },

  // Frame & Tubes
  {
    id: "17",
    english: "Frame",
    german: "Rahmen",
    uk: "Рама",
    category: "Frame",
    image: "/frame.png",
  },
  {
    id: "18",
    english: "Top tube",
    german: "Oberrohr",
    uk: "Верхня труба",
    category: "Frame",
    image: "/top_tube.png",
  },
  {
    id: "19",
    english: "Down tube",
    german: "Unterrohr",
    uk: "Нижня труба",
    category: "Frame",
    image: "/down_tube.png",
  },
  {
    id: "20",
    english: "Seat tube",
    german: "Sitzrohr",
    uk: "Сідельна труба",
    category: "Frame",
    image: "/seat_tube.png",
  },
  // to remove
  {
    id: "21",
    english: "Seat stay",
    german: "Sitzstrebe",
    uk: "Сідельні пір'я",
    category: "Frame",
    image: "/seat_stay.png",
  },
  {
    id: "22",
    english: "Chain stay",
    german: "Kettenstrebe",
    uk: "Ланцюгові пір'я",
    category: "Frame",
    image: "/chain_stay.png",
  },
  {
    id: "23",
    english: "Head tube",
    german: "Steuerrohr",
    uk: "Рульова труба",
    category: "Frame",
    image: "/head_tube.png",
  },
  {
    id: "24",
    english: "Fork",
    german: "Gabel",
    uk: "Вилка",
    category: "Frame",
    image: "/fork.jpg",
  },

  // Drivetrain
  {
    id: "25",
    english: "Pedal",
    german: "Pedal",
    uk: "Педаль",
    category: "Drivetrain",
    image: "/pedal.png",
  },
  {
    id: "26",
    english: "Crank",
    german: "Kurbel",
    uk: "Шатун",
    category: "Drivetrain",
    image: "/crank.png",
  },
  {
    id: "27",
    english: "Chainring",
    german: "Kettenblatt",
    uk: "Передня зірка",
    category: "Drivetrain",
    image: "/chainring.png",
  },
  {
    id: "28",
    english: "Chain",
    german: "Kette",
    uk: "Ланцюг",
    category: "Drivetrain",
    image: "/chain.png",
  },
  {
    id: "29",
    english: "Cassette",
    german: "Kassette",
    uk: "Касета",
    category: "Drivetrain",
    image: "/casette.png",
  },
  {
    id: "30",
    english: "Bottom bracket",
    german: "Tretlager",
    uk: "Каретка",
    category: "Drivetrain",
    image: "/bottom_bracket.jpg",
  },
  {
    id: "31",
    english: "Front derailleur",
    german: "Umwerfer",
    uk: "Передній перемикач",
    category: "Drivetrain",
    image: "/front_derailleur.png",
  },
  {
    id: "32",
    english: "Rear derailleur",
    german: "Schaltwerk",
    uk: "Задній перемикач",
    category: "Drivetrain",
    image: "/rear_derailleur.png",
  },

  // Seat
  {
    id: "33",
    english: "Saddle",
    german: "Sattel",
    uk: "Сідло",
    category: "Seat",
    image: "/saddle.jpg",
  },
  {
    id: "34",
    english: "Seat post",
    german: "Sattelstütze",
    uk: "Підсідельний штир",
    category: "Seat",
    image: "/seat_post.png",
  },
  {
    id: "35",
    english: "Seat clamp",
    german: "Sattelklemme",
    uk: "Затискач сідла",
    category: "Seat",
    image: "/seat_clamp.jpg ",
  },

  // Accessories
  {
    id: "36",
    english: "Front light",
    german: "Scheinwerfer",
    uk: "Фара",
    category: "Accessories",
    image: "/front_light.png",
  },
  {
    id: "37",
    english: "Rear light",
    german: "Rücklicht",
    uk: "Задній ліхтар",
    category: "Accessories",
    image: "/rear_light.jpg",
  },
  {
    id: "38",
    english: "Kickstand",
    german: "Seitenständer",
    uk: "Підніжка",
    category: "Accessories",
    image: "/kickstand.png",
  },
  {
    id: "39",
    english: "Fender",
    german: "Schutzblech",
    uk: "Крило",
    category: "Accessories",
    image: "/fender.jpg",
  },
  {
    id: "40",
    english: "Rear rack",
    german: "Gepäckträger",
    uk: "Багажник",
    category: "Accessories",
    image: "/rear_rack.png",
  },
  {
    id: "41",
    english: "Bell",
    german: "Klingel",
    uk: "Дзвінок",
    category: "Accessories",
    image: "/bell.png",
  },
];

type ViewMode = "learn" | "quiz";

export default function App() {
  const [mode, setMode] = useState<ViewMode>("learn");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const savedMode = localStorage.getItem("bp-mode");
    const savedRevealed = localStorage.getItem("bp-revealed");
    if (savedMode === "learn" || savedMode === "quiz") setMode(savedMode);
    if (savedRevealed) {
      try {
        setRevealed(JSON.parse(savedRevealed));
      } catch {
        setRevealed({});
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bp-mode", mode);
  }, [mode]);
  useEffect(() => {
    localStorage.setItem("bp-revealed", JSON.stringify(revealed));
  }, [revealed]);

  // quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [answeredId, setAnsweredId] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [attempted, setAttempted] = useState<Record<string, boolean>>({});

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(BIKE_PARTS.map((p) => p.category)))],
    []
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return BIKE_PARTS.filter((p) => {
      const matchesQuery =
        !q ||
        p.english.toLowerCase().includes(q) ||
        p.german.toLowerCase().includes(q) ||
        p.uk.toLowerCase().includes(q);
      const matchesCategory = category === "All" || p.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [search, category]);

  const quizOrder = useMemo(() => {
    const arr = [...BIKE_PARTS];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, []);

  const currentQuizPart = quizOrder[quizIndex] || null;
  const quizOptions = useMemo(() => {
    if (!currentQuizPart) return [] as BikePart[];
    // Take 3 random wrong options from the full list (excluding current)
    const pool = BIKE_PARTS.filter((p) => p.id !== currentQuizPart.id);
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    const wrongs = pool.slice(0, 3);
    const combined = [...wrongs, currentQuizPart];
    for (let i = combined.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [combined[i], combined[j]] = [combined[j], combined[i]];
    }
    return combined;
  }, [currentQuizPart]);

  useEffect(() => {
    setAnsweredId(null);
    setIsCorrect(null);
    setAttempted({});
  }, [quizIndex]);

  function resetQuiz() {
    setQuizIndex(0);
    setAnsweredId(null);
    setIsCorrect(null);
    setScore(0);
  }

  return (
    <div className="app">
      <div className="container">
        {/* Header */}
        <div className="header">
          <div>
            <h1 className="header-title">German Bicycle Parts</h1>
            <p className="header-subtitle">
              Clean and simple app to learn parts in German.
            </p>
          </div>
          {/* Segmented control */}
          <div className="tabs">
            {(
              [
                { k: "learn" as ViewMode, label: "Learn" },
                { k: "quiz" as ViewMode, label: "Quiz" },
              ] as { k: ViewMode; label: string }[]
            ).map((tab) => (
              <button
                key={tab.k}
                className={`tab-btn ${mode === tab.k ? "is-active" : ""}`}
                onClick={() => setMode(tab.k)}
                aria-pressed={mode === tab.k}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {mode === "learn" && (
          <div className="mb-6">
            {/* Filters */}
            <div className="row mb-4">
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search English, Ukrainian or German…"
                className="input"
                aria-label="Search parts"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="select"
                aria-label="Filter by category"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Grid */}
            <div className="grid cols-1 cols-2 cols-3 cols-4">
              {filtered.map((part) => {
                return (
                  <div key={part.id} className="card">
                    {part.image && part.image.trim() !== "" && (
                      <div className="card-figure">
                        <img
                          src={resolvePublicAssetPath(part.image)}
                          alt={`${part.english} example`}
                          loading="lazy"
                          onError={(e) => {
                            (
                              e.currentTarget as HTMLImageElement
                            ).style.display = "none";
                          }}
                        />
                      </div>
                    )}

                    <div className="card-title">{part.english}</div>
                    <div className="card-subtitle">{part.uk}</div>
                    <div className="card-translation">{part.german}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {mode === "quiz" && (
          <div className="mb-6">
            {/* Quiz header */}
            <div
              className="panel-head mb-4"
              style={{
                width: "100%",
                flexDirection: "column",
                alignItems: "stretch",
                gap: 10,
              }}
            >
              <div
                className="row"
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div className="row" style={{ gap: 6 }}>
                  <span className="badge-dark badge">
                    Q {Math.min(quizIndex + 1, BIKE_PARTS.length)} /{" "}
                    {BIKE_PARTS.length}
                  </span>
                  <span className="badge">Score: {score}</span>
                </div>
              </div>
              <div className="progress-wrap">
                <div className="progress">
                  <div
                    className="progress-bar"
                    style={{
                      width: `${
                        (Math.min(quizIndex, BIKE_PARTS.length - 1) /
                          (BIKE_PARTS.length - 1)) *
                        100
                      }%`,
                    }}
                  />
                </div>
                <div className="progress-label">
                  {Math.min(quizIndex + 1, BIKE_PARTS.length)} of{" "}
                  {BIKE_PARTS.length}
                </div>
              </div>
            </div>

            {currentQuizPart ? (
              <div className="panel">
                {currentQuizPart.image &&
                  currentQuizPart.image.trim() !== "" && (
                    <div className="quiz-figure">
                      <img
                        src={resolvePublicAssetPath(currentQuizPart.image)}
                        alt={`${currentQuizPart.english} example`}
                        loading="lazy"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display =
                            "none";
                        }}
                      />
                    </div>
                  )}

                <div className="mb-4">
                  <div className="text-sm text-muted">
                    What is the German word for
                  </div>
                  <div className="text-xxl">{currentQuizPart.english}</div>
                  <div className="card-subtitle">{currentQuizPart.uk}</div>
                </div>

                <div
                  className="grid quiz-options cols-1 cols-2"
                  style={{ gap: 8 }}
                >
                  {quizOptions.map((opt) => {
                    const selected = answeredId === opt.id;
                    const correct =
                      isCorrect === true && opt.id === currentQuizPart.id;
                    const wrong = !!attempted[opt.id];
                    return (
                      <button
                        key={opt.id}
                        onClick={() => {
                          if (isCorrect) return;
                          if (attempted[opt.id]) return;
                          setAnsweredId(opt.id);
                          const ok = opt.id === currentQuizPart.id;
                          if (ok) {
                            setIsCorrect(true);
                            setScore((s) => s + 1);
                          } else {
                            setIsCorrect(false);
                            setAttempted((prev) => ({
                              ...prev,
                              [opt.id]: true,
                            }));
                          }
                        }}
                        className={`btn option-btn ${
                          correct ? "is-correct" : ""
                        } ${wrong ? "is-wrong" : ""}`}
                        style={{
                          textAlign: "left",
                          borderColor:
                            selected && !correct && !wrong
                              ? "#111827"
                              : undefined,
                          borderWidth: 1,
                        }}
                        disabled={!!attempted[opt.id] || isCorrect === true}
                        aria-pressed={selected}
                      >
                        <div className="option-label">{opt.german}</div>
                        {correct && (
                          <div
                            className="option-state"
                            style={{ color: "#047857" }}
                          >
                            ✔
                          </div>
                        )}
                        {wrong && (
                          <div
                            className="option-state"
                            style={{ color: "#b91c1c" }}
                          >
                            ✖
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback + Actions */}
                <div className="panel-actions">
                  <div className="text-sm" style={{ minHeight: 20 }}>
                    {isCorrect === true && (
                      <span style={{ color: "#047857" }}>Correct ✔</span>
                    )}
                    {isCorrect === false && (
                      <span style={{ color: "#b91c1c" }}>Not quite ✖</span>
                    )}
                  </div>
                  <div className="row gap-2">
                    <button
                      onClick={() => setQuizIndex((i) => i + 1)}
                      className="btn btn-ghost"
                      disabled={quizIndex >= BIKE_PARTS.length - 1}
                    >
                      Skip
                    </button>
                    <button onClick={resetQuiz} className="btn">
                      Restart
                    </button>
                    <button
                      onClick={() => setQuizIndex((i) => i + 1)}
                      disabled={isCorrect !== true}
                      className={`btn ${
                        isCorrect !== true ? "btn-disabled" : "btn-primary"
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="panel" style={{ textAlign: "center" }}>
                <div className="text-xxl mb-4">All done!</div>
                <div className="text-muted mb-4">
                  Your score: {score} / {BIKE_PARTS.length}
                </div>
                <button onClick={resetQuiz} className="btn btn-primary">
                  Try again
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
