let navBar = document.querySelector('nav')

navBar.innerHTML = `
<div class="logoName">
          Spot krap
        </div>
        <div class="topNav">
          <ul class="linksInner mainLinks">
            <li class="drop">
              <a href="index.html"
                ><img src="../media/navIcons/host.png" alt="" /> Coupons
              </a>
            </li>
            <li class="drop">
                <a href="third-parties.html"
                  ><img src="../media/navIcons/host.png" alt="" /> Third Parties
                </a>
              </li>
          <div class="account">
            <div class="accInfo">
            </div>
            <img class="arrow" src="../media/navIcons/arrow-down.png" alt="" />
            <ul class="dropMenu dropAcc">
              <li>
                <a href="profile.html"><i class="fa-solid fa-user"></i>Edit Profile</a>
              </li>
              
              <li class="LogOut">
                <a href="#"
                id="logout-button"
                  ><i class="fa-solid fa-arrow-right-from-bracket"></i> Log Out
                </a>
              </li>
            </ul>
          </div>
        </div>
        <button class="menu" id="menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
`