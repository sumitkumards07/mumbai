/**
 * Main Interactive Features - Green & Rounded Theme
 * Shree Kshetrapal Jain Atithi Bhavan
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Sticky Navigation on Scroll
  const siteNav = document.getElementById("siteNav");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      siteNav.classList.add("scrolled");
    } else {
      siteNav.classList.remove("scrolled");
    }
  });

  // 2. Mobile Drawer Navigation
  const navToggle = document.getElementById("navToggle");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const drawerOverlay = document.getElementById("drawerOverlay");
  const drawerClose = document.getElementById("drawerClose");
  const drawerLinks = document.querySelectorAll(".drawer-link");

  function openDrawer() {
    mobileDrawer.classList.add("open");
    drawerOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    mobileDrawer.classList.remove("open");
    drawerOverlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  if (navToggle) navToggle.addEventListener("click", openDrawer);
  if (drawerClose) drawerClose.addEventListener("click", closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener("click", closeDrawer);
  drawerLinks.forEach(link => link.addEventListener("click", closeDrawer));

  // 3. Room Detail Modal
  const roomModal = document.getElementById("roomDetailModal");
  const roomModalClose = document.getElementById("roomModalClose");
  const modalImg = document.getElementById("modalRoomImg");
  const modalTitle = document.getElementById("modalRoomTitle");
  const modalPrice = document.getElementById("modalRoomPrice");
  const modalDesc = document.getElementById("modalRoomDesc");
  const modalBookBtn = document.getElementById("modalBookBtn");

  function openRoomModal(card) {
    const title = card.getAttribute("data-room-title") || "";
    const price = card.getAttribute("data-room-price") || "";
    const desc = card.getAttribute("data-room-desc") || "";
    const img = card.getAttribute("data-room-img") || "";
    const link = card.getAttribute("data-room-link") || "";

    if (modalTitle) modalTitle.textContent = title;
    if (modalPrice) modalPrice.textContent = price;
    if (modalDesc) modalDesc.textContent = desc;
    if (modalImg) modalImg.src = img;
    if (modalBookBtn) modalBookBtn.href = link;

    roomModal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeRoomModal() {
    if (roomModal) roomModal.classList.remove("open");
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".view-room-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const card = btn.closest(".room-card");
      if (card) openRoomModal(card);
    });
  });

  if (roomModalClose) roomModalClose.addEventListener("click", closeRoomModal);
  if (roomModal) {
    roomModal.addEventListener("click", (e) => {
      if (e.target === roomModal) closeRoomModal();
    });
  }

  // 4. Photo Gallery Lightbox
  const lightbox = document.getElementById("galleryLightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxPrev = document.getElementById("lightboxPrev");
  const lightboxNext = document.getElementById("lightboxNext");

  const galleryCards = Array.from(document.querySelectorAll(".gallery-card"));
  let currentGalleryIndex = 0;

  function showGalleryImage(index) {
    if (index < 0) index = galleryCards.length - 1;
    if (index >= galleryCards.length) index = 0;
    currentGalleryIndex = index;

    const card = galleryCards[index];
    const img = card.querySelector("img");
    const caption = card.getAttribute("data-caption") || img.alt || "";

    if (lightboxImg) lightboxImg.src = img.src;
    if (lightboxCaption) lightboxCaption.textContent = caption;
  }

  galleryCards.forEach((card, idx) => {
    card.addEventListener("click", () => {
      showGalleryImage(idx);
      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });

  function closeLightbox() {
    if (lightbox) lightbox.classList.remove("open");
    document.body.style.overflow = "";
  }

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener("click", () => showGalleryImage(currentGalleryIndex - 1));
  if (lightboxNext) lightboxNext.addEventListener("click", () => showGalleryImage(currentGalleryIndex + 1));
  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  // Keyboard navigation for modals
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeRoomModal();
      closeLightbox();
    } else if (lightbox && lightbox.classList.contains("open")) {
      if (e.key === "ArrowLeft") showGalleryImage(currentGalleryIndex - 1);
      if (e.key === "ArrowRight") showGalleryImage(currentGalleryIndex + 1);
    }
  });

  // 5. Accordion Toggle Logic (Works for Featured 5, About accordion, and Scroll Box)
  const allFaqItems = document.querySelectorAll(".faq-item");
  allFaqItems.forEach(item => {
    const header = item.querySelector(".faq-header");
    const body = item.querySelector(".faq-body");
    if (!header || !body) return;

    function toggleFaq() {
      const isOpen = item.classList.contains("active");

      // Scope closure to items in the same container
      const container = item.parentElement;
      container.querySelectorAll(".faq-item").forEach(sibling => {
        if (sibling !== item && sibling.classList.contains("active")) {
          sibling.classList.remove("active");
          const sibHeader = sibling.querySelector(".faq-header");
          const sibBody = sibling.querySelector(".faq-body");
          if (sibBody) sibBody.style.maxHeight = null;
          if (sibHeader) sibHeader.setAttribute("aria-expanded", "false");
        }
      });

      if (isOpen) {
        item.classList.remove("active");
        body.style.maxHeight = null;
        header.setAttribute("aria-expanded", "false");
      } else {
        item.classList.add("active");
        body.style.maxHeight = (body.scrollHeight + 35) + "px";
        header.setAttribute("aria-expanded", "true");

        // Smooth scroll opened item into view inside scroll box
        if (container && container.id === "faqScrollBox") {
          setTimeout(() => {
            const itemRect = item.getBoundingClientRect();
            const boxRect = container.getBoundingClientRect();
            if (itemRect.top < boxRect.top || itemRect.bottom > boxRect.bottom) {
              item.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }
          }, 150);
        }
      }
    }

    header.addEventListener("click", toggleFaq);
    header.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleFaq();
      }
    });
  });

  // 6. Archive Scroll Box Search & Category Filter
  const scrollBox = document.getElementById("faqScrollBox");
  const scrollItems = scrollBox ? Array.from(scrollBox.querySelectorAll(".faq-item")) : [];
  const faqSearchInput = document.getElementById("faqSearchInput");
  const faqClearBtn = document.getElementById("faqClearBtn");
  const faqFilterBtns = document.querySelectorAll(".faq-filter-btn");
  const faqStats = document.getElementById("faqStats");
  const faqEmptyState = document.getElementById("faqEmptyState");

  let currentFilter = "all";
  let currentSearch = "";

  function closeAllArchiveItems() {
    scrollItems.forEach(item => {
      if (item.classList.contains("active")) {
        item.classList.remove("active");
        const body = item.querySelector(".faq-body");
        const header = item.querySelector(".faq-header");
        if (body) body.style.maxHeight = null;
        if (header) header.setAttribute("aria-expanded", "false");
      }
    });
  }

  function updateArchiveList() {
    let matchedCount = 0;
    const query = currentSearch.toLowerCase().trim();

    scrollItems.forEach(item => {
      const q = item.getAttribute("data-question") || "";
      const a = item.getAttribute("data-answer") || "";
      const category = item.getAttribute("data-category") || "all";

      const matchesCategory = (currentFilter === "all" || category.includes(currentFilter));
      const matchesSearch = !query || q.toLowerCase().includes(query) || a.toLowerCase().includes(query);

      if (matchesCategory && matchesSearch) {
        matchedCount++;
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });

    // Toggle Empty State
    if (faqEmptyState) {
      faqEmptyState.style.display = (matchedCount === 0) ? "block" : "none";
    }

    if (faqStats) {
      if (query) {
        if (matchedCount === 0) {
          faqStats.textContent = `No topics matched "${query}" in archive`;
        } else {
          faqStats.textContent = `Found ${matchedCount} matching topics for "${query}"`;
        }
      } else if (currentFilter !== "all") {
        faqStats.textContent = `Showing ${matchedCount} topics in this category`;
      } else {
        faqStats.textContent = `Showing all ${matchedCount} topics inside archive`;
      }
    }

    if (scrollBox) {
      scrollBox.scrollTop = 0;
    }
  }

  function setCategory(cat) {
    currentFilter = cat;
    faqFilterBtns.forEach(btn => {
      if (btn.getAttribute("data-filter") === cat) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
    closeAllArchiveItems();
    updateArchiveList();
  }

  if (faqSearchInput) {
    faqSearchInput.addEventListener("input", (e) => {
      currentSearch = e.target.value;
      if (faqClearBtn) faqClearBtn.style.display = currentSearch ? "block" : "none";
      closeAllArchiveItems();
      updateArchiveList();
    });
  }

  if (faqClearBtn) {
    faqClearBtn.addEventListener("click", () => {
      if (faqSearchInput) {
        faqSearchInput.value = "";
        faqSearchInput.focus();
      }
      currentSearch = "";
      faqClearBtn.style.display = "none";
      closeAllArchiveItems();
      updateArchiveList();
    });
  }

  faqFilterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter") || "all";
      setCategory(filter);
    });
  });

  // Support jumping to FAQ category from other sections (e.g. from About section)
  document.querySelectorAll("[data-faq-jump]").forEach(el => {
    el.addEventListener("click", () => {
      const cat = el.getAttribute("data-faq-jump");
      if (cat) setCategory(cat);
    });
  });

  // Initial render of archive list
  updateArchiveList();

  // 7. Interactive Luxury Review Carousel
  const reviewsTrack = document.getElementById("reviewsTrack");
  const reviewPrevBtn = document.getElementById("reviewPrevBtn");
  const reviewNextBtn = document.getElementById("reviewNextBtn");
  const reviewDotsWrap = document.getElementById("reviewDotsWrap");

  if (reviewsTrack) {
    const cards = Array.from(reviewsTrack.querySelectorAll(".review-card-luxury"));
    const totalCards = cards.length;
    let currentSlide = 0;
    let autoplayInterval = null;

    // Render interactive pagination dots
    if (reviewDotsWrap) {
      reviewDotsWrap.innerHTML = "";
      for (let i = 0; i < totalCards; i++) {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = `review-dot ${i === 0 ? "active" : ""}`;
        dot.setAttribute("aria-label", `Go to Review ${i + 1}`);
        dot.addEventListener("click", () => {
          goToSlide(i);
          resetAutoplay();
        });
        reviewDotsWrap.appendChild(dot);
      }
    }

    function getVisibleCardsCount() {
      const w = window.innerWidth;
      if (w <= 768) return 1;
      if (w <= 1024) return 2;
      return 3;
    }

    function getMaxIndex() {
      const visible = getVisibleCardsCount();
      return Math.max(0, totalCards - visible);
    }

    function updateCarousel() {
      const maxIdx = getMaxIndex();
      if (currentSlide > maxIdx) currentSlide = maxIdx;
      if (currentSlide < 0) currentSlide = 0;

      if (cards.length > 0) {
        const firstCard = cards[0];
        const cardRect = firstCard.getBoundingClientRect();
        let gap = 24;
        if (cards.length > 1) {
          const secondCard = cards[1];
          gap = secondCard.getBoundingClientRect().left - cardRect.right;
          if (gap <= 0) gap = 24;
        }
        const shift = currentSlide * (cardRect.width + gap);
        reviewsTrack.style.transform = `translateX(-${shift}px)`;
      }

      // Update active dot
      if (reviewDotsWrap) {
        const dots = reviewDotsWrap.querySelectorAll(".review-dot");
        dots.forEach((dot, idx) => {
          if (idx === currentSlide) {
            dot.classList.add("active");
          } else {
            dot.classList.remove("active");
          }
        });
      }
    }

    function goToSlide(index) {
      const maxIdx = getMaxIndex();
      if (index < 0) {
        currentSlide = maxIdx;
      } else if (index > maxIdx) {
        currentSlide = 0;
      } else {
        currentSlide = index;
      }
      updateCarousel();
    }

    if (reviewPrevBtn) {
      reviewPrevBtn.addEventListener("click", () => {
        goToSlide(currentSlide - 1);
        resetAutoplay();
      });
    }

    if (reviewNextBtn) {
      reviewNextBtn.addEventListener("click", () => {
        goToSlide(currentSlide + 1);
        resetAutoplay();
      });
    }

    // Touch swipe support for mobile
    let startX = 0;
    let endX = 0;
    let isTouching = false;

    reviewsTrack.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      endX = startX;
      isTouching = true;
      stopAutoplay();
    }, { passive: true });

    reviewsTrack.addEventListener("touchmove", (e) => {
      if (!isTouching) return;
      endX = e.touches[0].clientX;
    }, { passive: true });

    reviewsTrack.addEventListener("touchend", () => {
      if (!isTouching) return;
      isTouching = false;
      const diffX = startX - endX;
      if (Math.abs(diffX) > 40) {
        if (diffX > 0) {
          goToSlide(currentSlide + 1);
        } else {
          goToSlide(currentSlide - 1);
        }
      }
      startX = 0;
      endX = 0;
      startAutoplay();
    });

    // Autoplay functionality
    function startAutoplay() {
      stopAutoplay();
      autoplayInterval = setInterval(() => {
        const maxIdx = getMaxIndex();
        if (currentSlide >= maxIdx) {
          goToSlide(0);
        } else {
          goToSlide(currentSlide + 1);
        }
      }, 5500);
    }

    function stopAutoplay() {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
      }
    }

    function resetAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    const outerContainer = document.querySelector(".reviews-carousel-outer");
    if (outerContainer) {
      outerContainer.addEventListener("mouseenter", stopAutoplay);
      outerContainer.addEventListener("mouseleave", startAutoplay);
    }

    window.addEventListener("resize", () => {
      updateCarousel();
    });

    // Initial positioning
    setTimeout(updateCarousel, 100);
    startAutoplay();
  }
});

