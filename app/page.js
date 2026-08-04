"use client";
import { useState, useMemo } from "react";
import Hero from "@/components/Hero";
import FilterBar from "@/components/FilterBar";
import EventsGrid from "@/components/EventsGrid";
import eventsData from "@/data/events.json";

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Extract unique categories from events data
  const categories = useMemo(() => {
    const unique = [...new Set(eventsData.map((e) => e.category))];
    return ["All", ...unique];
  }, []);

  // Filter events based on search term and selected category
  const filteredEvents = useMemo(() => {
    return eventsData.filter((event) => {
      const matchesSearch = event.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || event.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Events Section */}
      <section id="events" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#faf5eb] mb-3">
            Upcoming <span className="gradient-gold-text">Events</span>
          </h2>
          <p className="text-[#ddd0b8]/70 text-lg">
            Discover and register for our latest events, workshops, and lectures.
          </p>
        </div>

        <FilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
        />

        <EventsGrid filteredEvents={filteredEvents} />
      </section>
    </>
  );
}
