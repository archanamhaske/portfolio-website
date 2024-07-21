$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });

});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "AM | Personal Portfolio Website";
            $("#favicon").attr("href", "assets/images/favicon_io/favicon.ico");
        }
        else {
            document.title = "Come Back To My Personal Portfolio Website";
            $("#favicon").attr("href", "assets/images/favicon_io/love.png");
        }
    });


    async function fetchData(type = "skills") {
        const response = await fetch(`${type}.json`);
        const data = await response.json();
        return data;
    }
    
    function showSkills(skills) {
        const skillsContainer = document.getElementById("skillsContainer");
        let skillHTML = "";
        skills.forEach(skill => {
            skillHTML += `
            <div class="bar">
                  <div class="info">
                    <img src="${skill.icon}" alt="skill" />
                    <span>${skill.name}</span>
                  </div>
                </div>`;
        });
        skillsContainer.innerHTML = skillHTML;
    }
    
    document.addEventListener("DOMContentLoaded", async () => {
        const skills = await fetchData("skills");
        showSkills(skills);
    });

