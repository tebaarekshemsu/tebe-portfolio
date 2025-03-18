// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const categoryBtns = document.querySelectorAll('.category-btn');
const projectCards = document.querySelectorAll('.project-card');
const pagination = document.getElementById('pagination');
const currentYearEl = document.getElementById('current-year');

// Set current year in footer
currentYearEl.textContent = new Date().getFullYear();

// Theme Toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  
  // Update icon
  const icon = themeToggle.querySelector('i');
  if (document.body.classList.contains('dark')) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }
});

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

// Scroll to section
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    const offsetTop = section.offsetTop - 80; // Adjust for header height
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }
}

// Set active nav link based on scroll position
function setActiveNavLink() {
  const scrollPosition = window.scrollY + 100;
  
  // Find the current section
  const sections = document.querySelectorAll('.section');
  let currentSection = '';
  
  sections.forEach(section => {
    if (section.offsetTop <= scrollPosition) {
      currentSection = section.id;
    }
  });
  
  // Update nav links
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.dataset.section === currentSection) {
      link.classList.add('active');
    }
  });
  
  mobileNavLinks.forEach(link => {
    link.classList.remove('active');
    if (link.dataset.section === currentSection) {
      link.classList.add('active');
    }
  });
}

// Add event listeners to nav links
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    scrollToSection(link.dataset.section);
  });
});

mobileNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    scrollToSection(link.dataset.section);
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Project filtering
categoryBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    categoryBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const category = btn.dataset.category;
    
    // Filter projects
    projectCards.forEach(card => {
      if (category === 'All' || card.dataset.categories.includes(category)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
    
    // Reset pagination if needed
    updatePagination();
  });
});

// Pagination
function updatePagination() {
  // This is a simplified pagination. In a real project, you would implement
  // proper pagination with page numbers and navigation.
  const visibleProjects = Array.from(projectCards).filter(
    card => card.style.display !== 'none'
  );
  
  const projectsPerPage = 6;
  const totalPages = Math.ceil(visibleProjects.length / projectsPerPage);
  
  if (totalPages <= 1) {
    pagination.innerHTML = '';
    return;
  }
  
  let paginationHTML = '';
  
  // Previous button
  paginationHTML += `
    <button class="pagination-btn prev-btn" disabled>
      <i class="fas fa-chevron-left"></i>
    </button>
  `;
  
  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    paginationHTML += `
      <button class="pagination-btn page-btn ${i === 1 ? 'active' : ''}" data-page="${i}">
        ${i}
      </button>
    `;
  }
  
  // Next button
  paginationHTML += `
    <button class="pagination-btn next-btn ${totalPages === 1 ? 'disabled' : ''}">
      <i class="fas fa-chevron-right"></i>
    </button>
  `;
  
  pagination.innerHTML = paginationHTML;
  
  // Add event listeners to pagination buttons
  const pageBtns = document.querySelectorAll('.page-btn');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  
  pageBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const page = parseInt(btn.dataset.page);
      goToPage(page, visibleProjects, projectsPerPage);
      
      // Update active button
      pageBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Update prev/next buttons
      prevBtn.disabled = page === 1;
      nextBtn.disabled = page === totalPages;
    });
  });
  
  prevBtn.addEventListener('click', () => {
    const activePage = parseInt(document.querySelector('.page-btn.active').dataset.page);
    if (activePage > 1) {
      goToPage(activePage - 1, visibleProjects, projectsPerPage);
      
      // Update active button
      pageBtns.forEach(b => b.classList.remove('active'));
      document.querySelector(`[data-page="${activePage - 1}"]`).classList.add('active');
      
      // Update prev/next buttons
      prevBtn.disabled = activePage - 1 === 1;
      nextBtn.disabled = false;
    }
  });
  
  nextBtn.addEventListener('click', () => {
    const activePage = parseInt(document.querySelector('.page-btn.active').dataset.page);
    if (activePage < totalPages) {
      goToPage(activePage + 1, visibleProjects, projectsPerPage);
      
      // Update active button
      pageBtns.forEach(b => b.classList.remove('active'));
      document.querySelector(`[data-page="${activePage + 1}"]`).classList.add('active');
      
      // Update prev/next buttons
      prevBtn.disabled = false;
      nextBtn.disabled = activePage + 1 === totalPages;
    }
  });
  
  // Show first page by default
  goToPage(1, visibleProjects, projectsPerPage);
}

function goToPage(page, projects, projectsPerPage) {
  const startIndex = (page - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  
  projects.forEach((project, index) => {
    if (index >= startIndex && index < endIndex) {
      project.style.display = 'flex';
    } else {
      project.style.display = 'none';
    }
  });
}

// Contact form submission
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(contactForm);
  const name = formData.get('name');
  const email = formData.get('email');
  const subject = formData.get('subject');
  const message = formData.get('message');
  
  // Simulate form submission
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.innerHTML;
  
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  
  setTimeout(() => {
    // Reset form
    contactForm.reset();
    
    // Show success message
    formStatus.className = 'form-status success';
    formStatus.textContent = 'Message sent successfully!';
    
    // Reset button
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      formStatus.style.display = 'none';
    }, 3000);
  }, 1500);
});

// Initialize
window.addEventListener('scroll', setActiveNavLink);
window.addEventListener('load', () => {
  setActiveNavLink();
  updatePagination();
});

// Check for saved theme preference
if (localStorage.getItem('theme') === 'dark' || 
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.body.classList.add('dark');
  const icon = themeToggle.querySelector('i');
  icon.classList.remove('fa-moon');
  icon.classList.add('fa-sun');
}

// Save theme preference
themeToggle.addEventListener('click', () => {
  if (document.body.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});