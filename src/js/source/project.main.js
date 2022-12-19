"use strict";

var Teknasyon = Teknasyon || {};

Teknasyon.Main = (function ($) {
  //variables
  var e = {
    d: $(document),
    w: $(window),
    body: $("body"),
  };
  //variables End

  // init function
  var init = function init() {
    const saveContinue = document.getElementById("btn");
    const step = document.querySelector(".steps");
    const step1 = document.getElementById("step1");
    const step2 = document.getElementById("step2");
    const step3 = document.getElementById("step3");
    const icon1 = document.getElementById("icons1");
    const icon2 = document.getElementById("icons2");
    const icon3 = document.getElementById("icons3");
    const option = document.querySelector(".options");
    const step2Main = document.getElementById("step2Main");
    const step3Main = document.getElementById("step3Main");
    const saveContinue2 = document.getElementById("btn2");
    const paymentFinish = document.getElementById("paymentButton");
    const back1 = document.getElementById("back");
    const back2 = document.getElementById("back2");
    const lastPage = document.getElementById("lastPage");
    const footer = document.querySelector(".footer");
    const otels = document.getElementById("otels");
    const otelsopen = document.getElementById("date");
    const otelsExit = document.getElementById("date1");
    const person = document.getElementById("person");
    const children = document.getElementById("children");

    // Otel JSON
    fetch("assets/json/hotels.json")
      .then((response) => response.json())
      .then((veri) => {
        const select = document.getElementById("otels");
        let option = "";
        veri.forEach((veri) => {
          option += `<option value='${veri.id}' class='${veri.hotel_name}'>${veri.hotel_name}</option>`;
        });
        select.innerHTML = option;
      });

    // Otel Name
    let selected_name = "";
    $("select").change(function () {
      selected_name = $.trim($("#otels").children("option:selected").text());
      localStorage.setItem("OtelName", selected_name);
    });

    // Otel Id
    let selected_otel = "";
    document.getElementById("otels").addEventListener("change", function (e) {
      selected_otel = e.target.value;
      localStorage.setItem("OtelId", selected_otel);
    });

    // Giriş Tarihi Value
    let selected_open = "";
    let select_open = "";
    document.getElementById("date").addEventListener("change", function (e) {
      const date = new Date(e.target.value);
      select_open = date;
      const formattedDate = date.toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      selected_open = formattedDate;
      localStorage.setItem("DateEntry", selected_open);
      

      // Çıkış Tarihi Giriş Tarihinden önceki tarihleri baz almıyor
      const girisTarihi = new Date(select_open);
      const cikisTarihiInput = document.getElementById("date1");
      cikisTarihiInput.min = girisTarihi.toISOString().split("T")[0];

      if (girisTarihi <= cikisTarihiInput.valueAsDate) {
        this.value = "";
      }
    });

    //Çıkış Tarihi Value
    let selected_exit = "";
    let select_exit = "";
    document.getElementById("date1").addEventListener("change", function (e) {
      const date1 = new Date(e.target.value);
      select_exit = date1;
      const formattedDate = date1.toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      selected_exit = formattedDate;
      localStorage.setItem("DateRelease", selected_exit);
    });

    // Yetişkin Sayısı Value
    let selected_person = "";
    document.getElementById("person").addEventListener("change", function (e) {
      selected_person = e.target.value;
      localStorage.setItem("NumberAdults", selected_person);
    });

    // Çocuk Sayısı Value
    let selected_children = "";
    document
      .getElementById("children")
      .addEventListener("change", function (e) {
        selected_children = e.target.value;
        localStorage.setItem("NumberChildren", selected_children);
      });

    // Kart Son Kullanım Ay
    let selected_card_month = "";
    document.getElementById("month").addEventListener("change", function (e) {
      selected_card_month = e.target.value;
      localStorage.setItem("CardMonth", selected_card_month);
      const cardMonth = document.getElementById("cardMonth");
      const cardSlash = document.getElementById("cardSlash");
      cardMonth.textContent = selected_card_month;
      cardSlash.classList.remove("hide");
    });

    // Kart Son Kullanım Yıl
    let selected_card_year = "";
    document.getElementById("year").addEventListener("change", function (e) {
      selected_card_year = e.target.value;
      localStorage.setItem("CardYear", selected_card_year);
      const cardYear = document.getElementById("cardYear");
      cardYear.textContent = selected_card_year;
    });

    saveContinue.addEventListener("click", function () {
      if (selected_otel == "") {
        otels.style.borderColor = "red";
      } else if(select_open == ""){
        otelsopen.style.borderColor = "red";
      } else if(select_exit == ""){
        otelsExit.style.borderColor = "red";
      } else if(selected_person == ""){
        person.style.borderColor = "red";
      } else if(selected_children == ""){
        children.style.borderColor = "red";
      }
      else {
        step1.style.borderColor = "gray";
        icon1.style.color = "gray";
        step2.style.borderColor = "black";
        icon2.style.color = "black";
        option.classList.add("hide");
        step2Main.classList.remove("hide");
        saveContinue.classList.add("hide");
        saveContinue2.classList.remove("hide");
        back1.classList.remove("hide");
      }
      fetch("assets/json/hotels-details.json")
        .then((response) => response.json())
        .then((veri) => {
          veri.forEach((e) => {
            if (e.id == selected_otel) {
              const otelName = document.querySelector(".otelname");
              const row = `<p class="name">${selected_name}</p>
                          <p class="city">(${e.city})</p>`;
              otelName.innerHTML = row;
              const otelInfo = document.querySelector(".otelbilgi");
              const rowTwo = `<p class="primaryText">Giriş Tarihi:</p>
                            <p class="secondaryText">${selected_open}</p>
                            <p class="thirdText">-</p>
                            <p class="primaryText">Çıkış Tarihi:</p>
                            <p class="secondaryText">${selected_exit}</p>
                            <p class="thirdText">-</p>
                            <p class="primaryText">Yetişkin:</p>
                            <p class="secondaryText">${selected_person}</p>
                            <p class="thirdText">-</p>
                            <p class="primaryText">Çocuk:</p>
                            <p class="secondaryText">${selected_children}</p>`;
              otelInfo.innerHTML = rowTwo;
              const otelType = document.querySelector(".oteltipleri");
              const rowThree = `<div class="types">
                                <h3>${e.room_type[2].title}</h3>
                                <div class="img">
                                  <img src=${e.room_type[2].photo} alt="">
                                </div>
                                <div class="datenumber">
                                  <p>${dayDifference} Gün</p>
                                  <p>${selected_person} Yetişkin</p>
                                </div>
                                <div class="fiyat">
                                  <p>${e.room_type[2].price} TL</p>
                                </div>
                              </div>
                              <div class="types">
                                <h3>${e.room_type[1].title}</h3>
                                <div class="img">
                                  <img src=${e.room_type[1].photo} alt="">
                                </div>
                                <div class="datenumber">
                                  <p>${dayDifference} Gün</p>
                                  <p>${selected_person} Yetişkin</p>
                                </div>
                                <div class="fiyat">
                                  <p>${e.room_type[1].price} TL</p>
                                </div>
                              </div>
                              <div class="types">
                                <h3>${e.room_type[0].title}</h3>
                                <div class="img">
                                  <img src=${e.room_type[0].photo} alt="">
                                </div>
                                <div class="datenumber">
                                  <p>${dayDifference} Gün</p>
                                  <p>${selected_person} Yetişkin</p>
                                </div>
                                <div class="fiyat">
                                  <p>${e.room_type[0].price} TL</p>
                                </div>
                              </div>`;
              otelType.innerHTML = rowThree;
              const otelTypeTwo = document.getElementById("manzara");
              const rowFour = `<h2>Manzara Seçimi</h2>
                              <div class="oteltipleri">
                              <div class="types" id="mnz">
                              <h3>${e.room_scenic[2].title}</h3>
                              <div class="img">
                                <img src=${e.room_scenic[2].photo} alt="">
                              </div>
                              <div class="datenumber">
                                <p>Fiyata Etki Oranı</p>
                              </div>
                              <div class="fiyat">
                                <p id="artis">+ ${e.room_scenic[2].price_rate} %</p>
                              </div>
                              </div>
                              <div class="types" id="mnz">
                              <h3>${e.room_scenic[1].title}</h3>
                              <div class="img">
                                <img src=${e.room_scenic[1].photo} alt="">
                              </div>
                              <div class="datenumber">
                                <p>Fiyata Etki Oranı</p>
                              </div>
                              <div class="fiyat">
                                <p id="artis">+ ${e.room_scenic[1].price_rate} %</p>
                              </div>
                              </div>
                              <div class="types" id="mnz">
                              <h3>${e.room_scenic[0].title}</h3>
                              <div class="img">
                                <img src=${e.room_scenic[0].photo} alt="">
                              </div>
                              <div class="datenumber">
                                <p>Fiyata Etki Oranı</p>
                              </div>
                              <div class="fiyat">
                                <p id="artis">+ ${e.room_scenic[0].price_rate} %</p>
                              </div>
                              </div>
                              </div>`;
              otelTypeTwo.innerHTML = rowFour;
            }
            $(document).ready(function () {
              $(".types").click(function (event) {
                $(this).addClass("active").siblings().removeClass("active");
              });
            });
          });
        });
      const startDate = new Date(select_open);
      const endDate = new Date(select_exit);
      const timeDifference = Math.abs(endDate - startDate);
      const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    });

    back1.addEventListener("click", function () {
      step1.style.borderColor = "black";
      icon1.style.color = "black";
      step2.style.borderColor = "gray";
      icon2.style.color = "gray";
      option.classList.remove("hide");
      step2Main.classList.add("hide");
      saveContinue.classList.remove("hide");
      saveContinue2.classList.add("hide");
      back1.classList.add("hide");
    });

    saveContinue2.addEventListener("click", function () {
      step2.style.borderColor = "gray";
      icon2.style.color = "gray";
      step3.style.borderColor = "black";
      icon3.style.color = "black";
      back1.classList.add("hide");
      back2.classList.remove("hide");
      step2Main.classList.add("hide");
      step3Main.classList.remove("hide");
      saveContinue2.classList.add("hide");
      paymentFinish.classList.remove("hide");

      fetch("assets/json/hotels-details.json")
        .then((response) => response.json())
        .then((veri) => {
          veri.forEach((e) => {
            if (e.id == selected_otel) {
              const otelInfoName = document.querySelector(".userOtels");
              const rowFive = `<div class="otelname">
                    <p class="name">${selected_name}</p>
                    <p class="city">(${e.city})</p>                
                  </div>
                  <div class="userOtelsBox">
                    <p class="openDate">Giriş Tarihi:</p>
                    <p class="opDate">${selected_open}</p>
                  </div>
                  <div class="userOtelsBox1">
                    <p class="openDate">Çıkış Tarihi:</p>
                    <p class="opDate">${selected_exit}</p>
                  </div>
                  <div class="userOtelsBox2">
                    <p class="openDate">Yetişkin:</p>
                    <p class="opDate">${selected_person}</p>
                  </div>
                  <div class="userOtelsBox3">
                    <p class="openDate">Çocuk:</p>
                    <p class="opDate">${selected_children}</p>
                  </div>
                  <div class="userOtelsBox4">
                    <p class="openDate">Oda Tipi:</p>
                    <p class="opDate">${otelTypeName}</p>
                  </div>
                  <div class="userOtelsBox5">
                    <p class="openDate">Manzara:</p>
                    <p class="opDate">${otelTypeTwoName}</p>
                  </div>
                  <div class="userOtelsBox6">
                    <input type="text" placeholder="Kupon Kodu" class="codeInput">
                  </div>
                  <div class="userOtelsBox7">
                    <p class="texts">Oda Fiyatı</p>
                    <p class="price">${otelPriceText} TL</p>
                    <p class="texts">Fiyat Etki Oranı</p>
                    <p class="price">%${otelPriceTwoText}</p>
                    <p class="texts">Konaklama (${dayDifference} Gün)</p>
                    <p class="price">${sonucTwo} TL</p>
                    <p class="texts" id="priceTwo"></p>
                    <p class="price" id="priceOne"></p>
                    <hr/>
                    <p class="total">TOPLAM TUTAR</p>
                    <p class="totalPrice" id="total">${sonucTwo} TL</p>
                  </div>`;
              otelInfoName.innerHTML = rowFive;

              const codeInput = document.querySelector(".codeInput");
              codeInput.addEventListener("change", function () {
                fetch("assets/json/coupons.json")
                  .then((response) => response.json())
                  .then((data) => {
                    data.forEach((e) => {
                      if (codeInput.value == e.code) {
                        const num = e.discount_ammount;
                        localStorage.setItem("CouponsPrice", num);
                        const priceOne = document.getElementById("priceOne");
                        priceOne.innerHTML =
                          "-" + localStorage.getItem("CouponsPrice") + " TL";
                        const priceTwo = document.getElementById("priceTwo");
                        priceTwo.innerHTML =
                          "İndirim (CODE" + localStorage.getItem("CouponsPrice") + ")";
                        const total = document.getElementById("total");
                        total.innerHTML =
                          sonucTwo - localStorage.getItem("CouponsPrice");
                      }
                    });
                  });
              });
            }
          });
        });
      const startDate = new Date(select_open);
      const endDate = new Date(select_exit);
      const timeDifference = Math.abs(endDate - startDate);
      const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

      // Active olan Oda Tipi Textlerinin Getirilmesi
      const activeDivs = document.querySelector("div.types.active");
      const otelTypeName = activeDivs.childNodes[1].innerHTML;

      const otelTypePrice = activeDivs.childNodes[7].childNodes[1].innerHTML;
      const otelPrice = otelTypePrice.split(" ");
      const otelPriceText = otelPrice[0];

      // Active olan Manzara Tipi Textlerinin Getirilmesi
      const manzaraDiv = document.querySelector("div.types#mnz.active");
      const otelTypeTwoName = manzaraDiv.childNodes[1].innerHTML;
      const otelTypeTwoPrice = manzaraDiv.childNodes[7].childNodes[1].innerHTML;
      const otelPriceTwo = otelTypeTwoPrice.split(" ");
      const otelPriceTwoText = otelPriceTwo[1];

      // Toplama İşlemi
      const sonuc =
        (+(otelPriceText * otelPriceTwoText) / 100 + +otelPriceText) *
        dayDifference;
      const sonucTwo = sonuc.toFixed(2);
    });

    back2.addEventListener("click", function () {
      step2.style.borderColor = "black";
      icon2.style.color = "black";
      step3.style.borderColor = "gray";
      icon3.style.color = "gray";
      step3Main.classList.add("hide");
      step2Main.classList.remove("hide");
      back2.classList.add("hide");
      back1.classList.remove("hide");
      paymentFinish.classList.add("hide");
      saveContinue2.classList.remove("hide");
    });

    paymentFinish.addEventListener("click", function () {
      step.classList.add("hide");
      step3Main.classList.add("hide");
      lastPage.classList.remove("hide");
      footer.classList.add("hide");

      const startDate = new Date(select_open);
      const endDate = new Date(select_exit);
      const timeDifference = Math.abs(endDate - startDate);
      const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

      // Active olan Oda Tipi Textlerinin Getirilmesi
      const activeDivs = document.querySelector("div.types.active");
      const otelTypeName = activeDivs.childNodes[1].innerHTML;

      const otelTypePrice = activeDivs.childNodes[7].childNodes[1].innerHTML;
      const otelPrice = otelTypePrice.split(" ");
      const otelPriceText = otelPrice[0];

      // Active olan Manzara Tipi Textlerinin Getirilmesi
      const manzaraDiv = document.querySelector("div.types#mnz.active");
      const otelTypeTwoName = manzaraDiv.childNodes[1].innerHTML;
      const otelTypeTwoPrice = manzaraDiv.childNodes[7].childNodes[1].innerHTML;
      const otelPriceTwo = otelTypeTwoPrice.split(" ");
      const otelPriceTwoText = otelPriceTwo[1];

      // Toplama İşlemi
      const sonuc =
        (+(otelPriceText * otelPriceTwoText) / 100 + +otelPriceText) *
        dayDifference;
      const sonucTwo = sonuc.toFixed(2);

      fetch("assets/json/hotels-details.json")
        .then((response) => response.json())
        .then((veri) => {
          veri.forEach((e) => {
            const finishPage = document.querySelector(".doneInfo");
            const rowEight = `<div class="otelname">
                                <p class="name">${selected_name}</p>
                                <p class="city">(${e.city})</p>
                              </div>
                              <div class="userOtelsBox" id="box1">
                                <p class="openDate">Giriş Tarihi:</p>
                                <p class="opDate">${selected_open}</p>
                              </div>
                              <div class="userOtelsBox1" id="box2">
                                <p class="openDate">Çıkış Tarihi:</p>
                                <p class="opDate">${selected_exit}</p>
                              </div>
                              <div class="userOtelsBox2" id="box1">
                                <p class="openDate">Yetişkin:</p>
                                <p class="opDate">${selected_person}</p>
                              </div>
                              <div class="userOtelsBox3" id="box2">
                                <p class="openDate">Çocuk:</p>
                                <p class="opDate">${selected_children}</p>
                              </div>
                              <div class="userOtelsBox4" id="box1">
                                <p class="openDate">Opa Tipi:</p>
                                <p class="opDate">${otelTypeName}</p>
                              </div>
                              <div class="userOtelsBox5" id="box2">
                                <p class="openDate">Manzara:</p>
                                <p class="opDate">${otelTypeTwoName}</p>
                              </div>
                              <div class="userOtelsBox7" id="box7">
                                <p class="texts">Oda Fiyatı</p>
                                <p class="price">${otelPriceText} TL</p>
                                <p class="texts">Fiyat Etki Oranı</p>
                                <p class="price">%${otelPriceTwoText}</p>
                                <p class="texts">Konaklama (${dayDifference} Gün)</p>
                                <p class="price">${sonucTwo} TL</p>
                                <p class="texts">İndirim (CODE ${localStorage.getItem("CouponsPrice")})</p>
                                <p class="price">-${localStorage.getItem("CouponsPrice")} TL</p>
                                <hr />
                                <p class="total">TOPLAM TUTAR</p>
                                <p class="totalPrice">${sonucTwo - localStorage.getItem("CouponsPrice")} TL</p>
                              </div>`;
            finishPage.innerHTML = rowEight;
          });
        });
    });

    // Kart Numarasını 4 lü sisteme çevirme **
    const input = document.getElementById("cardNumber");
    input.addEventListener(
      "input",
      () => (input.value = formatNumber(input.value.replaceAll(" ", "")))
    );

    const formatNumber = (number) =>
      number.split("").reduce((seed, next, index) => {
        if (index !== 0 && !(index % 4)) seed += " ";
        return seed + next;
      }, "");

    // Kart Numarasının Karta yazılması
    const cardText = document.getElementById("cardText");

    input.addEventListener("change", updateValue);

    function updateValue(e) {
      cardText.textContent = e.target.value;
      localStorage.setItem("CardText", cardText);
    }

    // Kart Sahibinin Adının Karta Yazılması
    const cardNameText = document.getElementById("cardNameText");
    const cardName = document.getElementById("cardName");

    cardNameText.addEventListener("change", updateName);

    function updateName(e) {
      cardName.textContent = e.target.value;
      localStorage.setItem("CardNameText", cardNameText);
    }
  };
  // init function end

  return {
    Init: init,
  };
})(jQuery);

$(function () {
  Teknasyon.Main.Init();
});
