document.addEventListener("DOMContentLoaded", function() {
    // 1. Navigation & Scrolling
    if (typeof initScrollProgress === 'function') initScrollProgress();
    if (typeof initScrollSpy === 'function') initScrollSpy();
    if (typeof initBackToTop === 'function') initBackToTop();

    // 2. Dynamic Hero Section
    if (typeof initTypingAnimation === 'function') initTypingAnimation();
    if (typeof initDynamicGreeting === 'function') initDynamicGreeting();
    if (typeof initGeolocation === 'function') initGeolocation();




    // 3. Projects Features
    if (typeof renderProjects === 'function') renderProjects();
    if (typeof initProjectFilters === 'function') initProjectFilters();
    if (typeof initProjectSearch === 'function') initProjectSearch();
    if (typeof initProjectSort === 'function') initProjectSort();
    if (typeof initRecentlyViewed === 'function') initRecentlyViewed();

    // 4. Skills Features
    if (typeof renderSkills === 'function') renderSkills();
    if (typeof initSkillsFilters === 'function') initSkillsFilters();

    // 5. Existing & Modal Features
    if (typeof initModal === 'function') initModal();
    if (typeof initContactValidation === 'function') initContactValidation();
    if (typeof initContactAutosave === 'function') initContactAutosave();
    if (typeof initThemeToggle === 'function') initThemeToggle();
    if (typeof initLanguageSelector === 'function') initLanguageSelector();
    if (typeof initMinimalCursor === 'function') initMinimalCursor();
    if (typeof initModernDesign === 'function') initModernDesign();
    
    if (typeof initDeveloperStats === 'function') initDeveloperStats();






});