document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. БАГИЙН ГИШҮҮД ---
    const teamData = [
        { name: "А.Билгүүнөгс", role: "4A" },
        { name: "М.Хосбат", role: "4C" },
        { name: "Т.Отгонбаатар", role: "4D" },
        { name: "М.Анхбаяр", role: "4D" },
        { name: "Э.Сэргэлэнбаяр", role: "4D" },
        { name: "Г.Нямлхагва", role: "Teencoding" },
        { name: "Ц.Должинсүрэн", role: "College Prep" },
        { name: "Э.Оюундарь", role: "Advanced HOP" }
    ];

    const teamContainer = document.getElementById('team-members-container');
    if (teamContainer) {
        teamData.forEach((member) => {
            const memberHTML = `
                <div class="team-member">
                    <div class="avatar">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </div>
                    <div class="member-name">${member.name}</div>
                    <div class="member-role">${member.role}</div>
                </div>
            `;
            teamContainer.insertAdjacentHTML('beforeend', memberHTML);
        });
    }

    // --- 2. СЛАЙД УДИРДАХ ЛОГИК ---
    const slides = document.querySelectorAll('.slide');
    const logo = document.getElementById('main-logo');
    const navActions = document.getElementById('nav-actions');
    const heroText = document.querySelector('.hero-text-block');

    let currentSlide = 0;

    function goToSlide(index) {
        if (!slides.length) return;
        
        slides[currentSlide].classList.remove('active');
        
        if (currentSlide === 3) {
            slides[3].classList.remove('start-q-anim');
        }

        currentSlide = index;
        slides[currentSlide].classList.add('active');

        if (currentSlide === 0) {
            if (logo) {
                logo.classList.remove('corner');
                logo.classList.add('centered');
            }
            if(heroText) heroText.classList.remove('visible');
            if(navActions) navActions.classList.remove('scrolled');
        } else {
            if (logo) {
                logo.classList.remove('centered');
                logo.classList.add('corner');
            }
            if(heroText) heroText.classList.add('visible');
            if(navActions) navActions.classList.add('scrolled');
        }

        if (currentSlide === 3) {
            setTimeout(() => {
                slides[3].classList.add('start-q-anim');
            }, 50);
        }
    }

    // Дэлгэцийн аль хэсэгт товшихоос шалтгаалж слайд шилжих (Слайдер доторх товшилтыг слайд солихгүгээр тусад нь салгав)
    document.addEventListener('click', (e) => {
        if (e.target.closest('#problem-slider') || e.target.closest('#solution-slider')) return;
        
        const screenWidth = window.innerWidth;
        const clickX = e.clientX;

        if (clickX > screenWidth / 2) {
            let newIndex = (currentSlide + 1) % slides.length;
            goToSlide(newIndex);
        } else {
            let newIndex = (currentSlide - 1 + slides.length) % slides.length;
            goToSlide(newIndex);
        }
    });

    // Гарны товчлууруудаар удирдах
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            let newIndex = (currentSlide + 1) % slides.length;
            goToSlide(newIndex);
        }
        if (e.key === 'ArrowLeft') {
            let newIndex = (currentSlide - 1 + slides.length) % slides.length;
            goToSlide(newIndex);
        }
    });

    // --- 3. АСУУДАЛ СЛАЙДЕРЫН ЛОГИК (Бүрэн засварлагдсан) ---
    const problemSlider = document.getElementById('problem-slider');
    const problemSlides = document.querySelectorAll('.problem-slide');
    let currentProblem = 0;

    if (problemSlider && problemSlides.length > 0) {
        problemSlider.addEventListener('click', (e) => {
            e.stopPropagation(); // Үндсэн слайд солигдох функцийг хааж байна
            problemSlides[currentProblem].classList.remove('active');
            currentProblem = (currentProblem + 1) % problemSlides.length;
            problemSlides[currentProblem].classList.add('active');
        });
    }

    // --- 4. ШИЙДЭЛ СЛАЙДЕРЫН ЛОГИК ---
    const solutionSlider = document.getElementById('solution-slider');
    const solutionSlides = document.querySelectorAll('.solution-slide');
    let currentSolution = 0;

    if (solutionSlider && solutionSlides.length > 0) {
        solutionSlider.addEventListener('click', (e) => {
            e.stopPropagation(); // Үндсэн слайд солигдох функцийг хааж байна
            solutionSlides[currentSolution].classList.remove('active');
            currentSolution = (currentSolution + 1) % solutionSlides.length;
            solutionSlides[currentSolution].classList.add('active');
        });
    }
});