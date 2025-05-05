// DOM元素
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const contactForm = document.getElementById('contactForm');
const header = document.querySelector('header');

// 导航栏响应式功能
function toggleNavigation() {
    // 切换导航菜单
    nav.classList.toggle('active');
    
    // 动画链接
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            // 修复了这里的动画代码
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // 汉堡菜单动画
    burger.classList.toggle('toggle');
}

// 平滑滚动功能
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // 如果导航菜单是打开的，点击后关闭它
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                burger.classList.remove('toggle');
            }
        });
    });
}

// 项目筛选功能
function setupProjectFilters() {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 移除所有按钮的active类
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // 给当前点击的按钮添加active类
            button.classList.add('active');
            
            const filter = button.dataset.filter;
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// 页面滚动效果
function handleScroll() {
    // 当页面滚动时，给导航栏添加阴影
    if (window.scrollY > 0) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
}

// 添加滚动到顶部按钮
function addScrollToTopButton() {
    // 创建按钮元素
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.classList.add('scroll-top');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollTopBtn);
    
    // 监听滚动事件，控制按钮显示/隐藏
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    // 点击按钮滚动到顶部
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 添加按钮样式
    const style = document.createElement('style');
    style.textContent = `
        .scroll-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--primary-color);
            color: white;
            border: none;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
        }
        .scroll-top.show {
            opacity: 1;
            visibility: visible;
        }
        .scroll-top:hover {
            background-color: #3a5bd9;
            transform: translateY(-3px);
        }
    `;
    document.head.appendChild(style);
}

// 添加CSS动画
function addAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes navLinkFade {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .fade-in {
            animation: fadeIn 1s ease forwards;
        }
    `;
    document.head.appendChild(style);
}

// 添加页面加载动画
function addPageLoadAnimation() {
    const sections = document.querySelectorAll('section');
    
    // 创建一个Intersection Observer来检测元素是否在视口中
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // 观察所有部分
    sections.forEach(section => {
        section.style.opacity = '0';
        observer.observe(section);
    });
}

// 初始化函数
function init() {
    // 添加事件监听器
    if (burger) burger.addEventListener('click', toggleNavigation);
    window.addEventListener('scroll', handleScroll);
    
    // 设置功能
    setupSmoothScrolling();
    setupProjectFilters();
    setupContactForm();
    
    // 添加额外功能
    addScrollToTopButton();
    addAnimations();
    
    // 页面加载完成后的动画
    window.addEventListener('load', addPageLoadAnimation);
}

// 当DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', init);