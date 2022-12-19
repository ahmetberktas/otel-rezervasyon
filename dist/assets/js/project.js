"use strict";

var Teknasyon = Teknasyon || {};
Teknasyon.Main = function ($) {
  //variables
  var e = {
    d: $(document),
    w: $(window),
    body: $("body")
  };
  //variables End

  // init function
  var init = function init() {
    var saveContinue = document.getElementById("btn");
    var step = document.querySelector(".steps");
    var step1 = document.getElementById("step1");
    var step2 = document.getElementById("step2");
    var step3 = document.getElementById("step3");
    var icon1 = document.getElementById("icons1");
    var icon2 = document.getElementById("icons2");
    var icon3 = document.getElementById("icons3");
    var option = document.querySelector(".options");
    var step2Main = document.getElementById("step2Main");
    var step3Main = document.getElementById("step3Main");
    var saveContinue2 = document.getElementById("btn2");
    var paymentFinish = document.getElementById("paymentButton");
    var back1 = document.getElementById("back");
    var back2 = document.getElementById("back2");
    var lastPage = document.getElementById("lastPage");
    var footer = document.querySelector(".footer");
    var otels = document.getElementById("otels");
    var otelsopen = document.getElementById("date");
    var otelsExit = document.getElementById("date1");
    var person = document.getElementById("person");
    var children = document.getElementById("children");

    // Otel JSON
    fetch("assets/json/hotels.json").then(function (response) {
      return response.json();
    }).then(function (veri) {
      var select = document.getElementById("otels");
      var option = "";
      veri.forEach(function (veri) {
        option += "<option value='".concat(veri.id, "' class='").concat(veri.hotel_name, "'>").concat(veri.hotel_name, "</option>");
      });
      select.innerHTML = option;
    });

    // Otel Name
    var selected_name = "";
    $("select").change(function () {
      selected_name = $.trim($("#otels").children("option:selected").text());
      localStorage.setItem("OtelName", selected_name);
    });

    // Otel Id
    var selected_otel = "";
    document.getElementById("otels").addEventListener("change", function (e) {
      selected_otel = e.target.value;
      localStorage.setItem("OtelId", selected_otel);
    });

    // Giriş Tarihi Value
    var selected_open = "";
    var select_open = "";
    document.getElementById("date").addEventListener("change", function (e) {
      var date = new Date(e.target.value);
      select_open = date;
      var formattedDate = date.toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      });
      selected_open = formattedDate;
      localStorage.setItem("DateEntry", selected_open);

      // Çıkış Tarihi Giriş Tarihinden önceki tarihleri baz almıyor
      var girisTarihi = new Date(select_open);
      var cikisTarihiInput = document.getElementById("date1");
      cikisTarihiInput.min = girisTarihi.toISOString().split("T")[0];
      if (girisTarihi <= cikisTarihiInput.valueAsDate) {
        this.value = "";
      }
    });

    //Çıkış Tarihi Value
    var selected_exit = "";
    var select_exit = "";
    document.getElementById("date1").addEventListener("change", function (e) {
      var date1 = new Date(e.target.value);
      select_exit = date1;
      var formattedDate = date1.toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      });
      selected_exit = formattedDate;
      localStorage.setItem("DateRelease", selected_exit);
    });

    // Yetişkin Sayısı Value
    var selected_person = "";
    document.getElementById("person").addEventListener("change", function (e) {
      selected_person = e.target.value;
      localStorage.setItem("NumberAdults", selected_person);
    });

    // Çocuk Sayısı Value
    var selected_children = "";
    document.getElementById("children").addEventListener("change", function (e) {
      selected_children = e.target.value;
      localStorage.setItem("NumberChildren", selected_children);
    });

    // Kart Son Kullanım Ay
    var selected_card_month = "";
    document.getElementById("month").addEventListener("change", function (e) {
      selected_card_month = e.target.value;
      localStorage.setItem("CardMonth", selected_card_month);
      var cardMonth = document.getElementById("cardMonth");
      var cardSlash = document.getElementById("cardSlash");
      cardMonth.textContent = selected_card_month;
      cardSlash.classList.remove("hide");
    });

    // Kart Son Kullanım Yıl
    var selected_card_year = "";
    document.getElementById("year").addEventListener("change", function (e) {
      selected_card_year = e.target.value;
      localStorage.setItem("CardYear", selected_card_year);
      var cardYear = document.getElementById("cardYear");
      cardYear.textContent = selected_card_year;
    });
    saveContinue.addEventListener("click", function () {
      if (selected_otel == "") {
        otels.style.borderColor = "red";
      } else if (select_open == "") {
        otelsopen.style.borderColor = "red";
      } else if (select_exit == "") {
        otelsExit.style.borderColor = "red";
      } else if (selected_person == "") {
        person.style.borderColor = "red";
      } else if (selected_children == "") {
        children.style.borderColor = "red";
      } else {
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
      fetch("assets/json/hotels-details.json").then(function (response) {
        return response.json();
      }).then(function (veri) {
        veri.forEach(function (e) {
          if (e.id == selected_otel) {
            var otelName = document.querySelector(".otelname");
            var row = "<p class=\"name\">".concat(selected_name, "</p>\n                          <p class=\"city\">(").concat(e.city, ")</p>");
            otelName.innerHTML = row;
            var otelInfo = document.querySelector(".otelbilgi");
            var rowTwo = "<p class=\"primaryText\">Giri\u015F Tarihi:</p>\n                            <p class=\"secondaryText\">".concat(selected_open, "</p>\n                            <p class=\"thirdText\">-</p>\n                            <p class=\"primaryText\">\xC7\u0131k\u0131\u015F Tarihi:</p>\n                            <p class=\"secondaryText\">").concat(selected_exit, "</p>\n                            <p class=\"thirdText\">-</p>\n                            <p class=\"primaryText\">Yeti\u015Fkin:</p>\n                            <p class=\"secondaryText\">").concat(selected_person, "</p>\n                            <p class=\"thirdText\">-</p>\n                            <p class=\"primaryText\">\xC7ocuk:</p>\n                            <p class=\"secondaryText\">").concat(selected_children, "</p>");
            otelInfo.innerHTML = rowTwo;
            var otelType = document.querySelector(".oteltipleri");
            var rowThree = "<div class=\"types\">\n                                <h3>".concat(e.room_type[2].title, "</h3>\n                                <div class=\"img\">\n                                  <img src=").concat(e.room_type[2].photo, " alt=\"\">\n                                </div>\n                                <div class=\"datenumber\">\n                                  <p>").concat(dayDifference, " G\xFCn</p>\n                                  <p>").concat(selected_person, " Yeti\u015Fkin</p>\n                                </div>\n                                <div class=\"fiyat\">\n                                  <p>").concat(e.room_type[2].price, " TL</p>\n                                </div>\n                              </div>\n                              <div class=\"types\">\n                                <h3>").concat(e.room_type[1].title, "</h3>\n                                <div class=\"img\">\n                                  <img src=").concat(e.room_type[1].photo, " alt=\"\">\n                                </div>\n                                <div class=\"datenumber\">\n                                  <p>").concat(dayDifference, " G\xFCn</p>\n                                  <p>").concat(selected_person, " Yeti\u015Fkin</p>\n                                </div>\n                                <div class=\"fiyat\">\n                                  <p>").concat(e.room_type[1].price, " TL</p>\n                                </div>\n                              </div>\n                              <div class=\"types\">\n                                <h3>").concat(e.room_type[0].title, "</h3>\n                                <div class=\"img\">\n                                  <img src=").concat(e.room_type[0].photo, " alt=\"\">\n                                </div>\n                                <div class=\"datenumber\">\n                                  <p>").concat(dayDifference, " G\xFCn</p>\n                                  <p>").concat(selected_person, " Yeti\u015Fkin</p>\n                                </div>\n                                <div class=\"fiyat\">\n                                  <p>").concat(e.room_type[0].price, " TL</p>\n                                </div>\n                              </div>");
            otelType.innerHTML = rowThree;
            var otelTypeTwo = document.getElementById("manzara");
            var rowFour = "<h2>Manzara Se\xE7imi</h2>\n                              <div class=\"oteltipleri\">\n                              <div class=\"types\" id=\"mnz\">\n                              <h3>".concat(e.room_scenic[2].title, "</h3>\n                              <div class=\"img\">\n                                <img src=").concat(e.room_scenic[2].photo, " alt=\"\">\n                              </div>\n                              <div class=\"datenumber\">\n                                <p>Fiyata Etki Oran\u0131</p>\n                              </div>\n                              <div class=\"fiyat\">\n                                <p id=\"artis\">+ ").concat(e.room_scenic[2].price_rate, " %</p>\n                              </div>\n                              </div>\n                              <div class=\"types\" id=\"mnz\">\n                              <h3>").concat(e.room_scenic[1].title, "</h3>\n                              <div class=\"img\">\n                                <img src=").concat(e.room_scenic[1].photo, " alt=\"\">\n                              </div>\n                              <div class=\"datenumber\">\n                                <p>Fiyata Etki Oran\u0131</p>\n                              </div>\n                              <div class=\"fiyat\">\n                                <p id=\"artis\">+ ").concat(e.room_scenic[1].price_rate, " %</p>\n                              </div>\n                              </div>\n                              <div class=\"types\" id=\"mnz\">\n                              <h3>").concat(e.room_scenic[0].title, "</h3>\n                              <div class=\"img\">\n                                <img src=").concat(e.room_scenic[0].photo, " alt=\"\">\n                              </div>\n                              <div class=\"datenumber\">\n                                <p>Fiyata Etki Oran\u0131</p>\n                              </div>\n                              <div class=\"fiyat\">\n                                <p id=\"artis\">+ ").concat(e.room_scenic[0].price_rate, " %</p>\n                              </div>\n                              </div>\n                              </div>");
            otelTypeTwo.innerHTML = rowFour;
          }
          $(document).ready(function () {
            $(".types").click(function (event) {
              $(this).addClass("active").siblings().removeClass("active");
            });
          });
        });
      });
      var startDate = new Date(select_open);
      var endDate = new Date(select_exit);
      var timeDifference = Math.abs(endDate - startDate);
      var dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
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
      fetch("assets/json/hotels-details.json").then(function (response) {
        return response.json();
      }).then(function (veri) {
        veri.forEach(function (e) {
          if (e.id == selected_otel) {
            var otelInfoName = document.querySelector(".userOtels");
            var rowFive = "<div class=\"otelname\">\n                    <p class=\"name\">".concat(selected_name, "</p>\n                    <p class=\"city\">(").concat(e.city, ")</p>                \n                  </div>\n                  <div class=\"userOtelsBox\">\n                    <p class=\"openDate\">Giri\u015F Tarihi:</p>\n                    <p class=\"opDate\">").concat(selected_open, "</p>\n                  </div>\n                  <div class=\"userOtelsBox1\">\n                    <p class=\"openDate\">\xC7\u0131k\u0131\u015F Tarihi:</p>\n                    <p class=\"opDate\">").concat(selected_exit, "</p>\n                  </div>\n                  <div class=\"userOtelsBox2\">\n                    <p class=\"openDate\">Yeti\u015Fkin:</p>\n                    <p class=\"opDate\">").concat(selected_person, "</p>\n                  </div>\n                  <div class=\"userOtelsBox3\">\n                    <p class=\"openDate\">\xC7ocuk:</p>\n                    <p class=\"opDate\">").concat(selected_children, "</p>\n                  </div>\n                  <div class=\"userOtelsBox4\">\n                    <p class=\"openDate\">Oda Tipi:</p>\n                    <p class=\"opDate\">").concat(otelTypeName, "</p>\n                  </div>\n                  <div class=\"userOtelsBox5\">\n                    <p class=\"openDate\">Manzara:</p>\n                    <p class=\"opDate\">").concat(otelTypeTwoName, "</p>\n                  </div>\n                  <div class=\"userOtelsBox6\">\n                    <input type=\"text\" placeholder=\"Kupon Kodu\" class=\"codeInput\">\n                  </div>\n                  <div class=\"userOtelsBox7\">\n                    <p class=\"texts\">Oda Fiyat\u0131</p>\n                    <p class=\"price\">").concat(otelPriceText, " TL</p>\n                    <p class=\"texts\">Fiyat Etki Oran\u0131</p>\n                    <p class=\"price\">%").concat(otelPriceTwoText, "</p>\n                    <p class=\"texts\">Konaklama (").concat(dayDifference, " G\xFCn)</p>\n                    <p class=\"price\">").concat(sonucTwo, " TL</p>\n                    <p class=\"texts\" id=\"priceTwo\"></p>\n                    <p class=\"price\" id=\"priceOne\"></p>\n                    <hr/>\n                    <p class=\"total\">TOPLAM TUTAR</p>\n                    <p class=\"totalPrice\" id=\"total\">").concat(sonucTwo, " TL</p>\n                  </div>");
            otelInfoName.innerHTML = rowFive;
            var codeInput = document.querySelector(".codeInput");
            codeInput.addEventListener("change", function () {
              fetch("assets/json/coupons.json").then(function (response) {
                return response.json();
              }).then(function (data) {
                data.forEach(function (e) {
                  if (codeInput.value == e.code) {
                    var num = e.discount_ammount;
                    localStorage.setItem("CouponsPrice", num);
                    var priceOne = document.getElementById("priceOne");
                    priceOne.innerHTML = "-" + localStorage.getItem("CouponsPrice") + " TL";
                    var priceTwo = document.getElementById("priceTwo");
                    priceTwo.innerHTML = "İndirim (CODE" + localStorage.getItem("CouponsPrice") + ")";
                    var total = document.getElementById("total");
                    total.innerHTML = sonucTwo - localStorage.getItem("CouponsPrice");
                  }
                });
              });
            });
          }
        });
      });
      var startDate = new Date(select_open);
      var endDate = new Date(select_exit);
      var timeDifference = Math.abs(endDate - startDate);
      var dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

      // Active olan Oda Tipi Textlerinin Getirilmesi
      var activeDivs = document.querySelector("div.types.active");
      var otelTypeName = activeDivs.childNodes[1].innerHTML;
      var otelTypePrice = activeDivs.childNodes[7].childNodes[1].innerHTML;
      var otelPrice = otelTypePrice.split(" ");
      var otelPriceText = otelPrice[0];

      // Active olan Manzara Tipi Textlerinin Getirilmesi
      var manzaraDiv = document.querySelector("div.types#mnz.active");
      var otelTypeTwoName = manzaraDiv.childNodes[1].innerHTML;
      var otelTypeTwoPrice = manzaraDiv.childNodes[7].childNodes[1].innerHTML;
      var otelPriceTwo = otelTypeTwoPrice.split(" ");
      var otelPriceTwoText = otelPriceTwo[1];

      // Toplama İşlemi
      var sonuc = (+(otelPriceText * otelPriceTwoText) / 100 + +otelPriceText) * dayDifference;
      var sonucTwo = sonuc.toFixed(2);
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
      var startDate = new Date(select_open);
      var endDate = new Date(select_exit);
      var timeDifference = Math.abs(endDate - startDate);
      var dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

      // Active olan Oda Tipi Textlerinin Getirilmesi
      var activeDivs = document.querySelector("div.types.active");
      var otelTypeName = activeDivs.childNodes[1].innerHTML;
      var otelTypePrice = activeDivs.childNodes[7].childNodes[1].innerHTML;
      var otelPrice = otelTypePrice.split(" ");
      var otelPriceText = otelPrice[0];

      // Active olan Manzara Tipi Textlerinin Getirilmesi
      var manzaraDiv = document.querySelector("div.types#mnz.active");
      var otelTypeTwoName = manzaraDiv.childNodes[1].innerHTML;
      var otelTypeTwoPrice = manzaraDiv.childNodes[7].childNodes[1].innerHTML;
      var otelPriceTwo = otelTypeTwoPrice.split(" ");
      var otelPriceTwoText = otelPriceTwo[1];

      // Toplama İşlemi
      var sonuc = (+(otelPriceText * otelPriceTwoText) / 100 + +otelPriceText) * dayDifference;
      var sonucTwo = sonuc.toFixed(2);
      fetch("assets/json/hotels-details.json").then(function (response) {
        return response.json();
      }).then(function (veri) {
        veri.forEach(function (e) {
          var finishPage = document.querySelector(".doneInfo");
          var rowEight = "<div class=\"otelname\">\n                                <p class=\"name\">".concat(selected_name, "</p>\n                                <p class=\"city\">(").concat(e.city, ")</p>\n                              </div>\n                              <div class=\"userOtelsBox\" id=\"box1\">\n                                <p class=\"openDate\">Giri\u015F Tarihi:</p>\n                                <p class=\"opDate\">").concat(selected_open, "</p>\n                              </div>\n                              <div class=\"userOtelsBox1\" id=\"box2\">\n                                <p class=\"openDate\">\xC7\u0131k\u0131\u015F Tarihi:</p>\n                                <p class=\"opDate\">").concat(selected_exit, "</p>\n                              </div>\n                              <div class=\"userOtelsBox2\" id=\"box1\">\n                                <p class=\"openDate\">Yeti\u015Fkin:</p>\n                                <p class=\"opDate\">").concat(selected_person, "</p>\n                              </div>\n                              <div class=\"userOtelsBox3\" id=\"box2\">\n                                <p class=\"openDate\">\xC7ocuk:</p>\n                                <p class=\"opDate\">").concat(selected_children, "</p>\n                              </div>\n                              <div class=\"userOtelsBox4\" id=\"box1\">\n                                <p class=\"openDate\">Opa Tipi:</p>\n                                <p class=\"opDate\">").concat(otelTypeName, "</p>\n                              </div>\n                              <div class=\"userOtelsBox5\" id=\"box2\">\n                                <p class=\"openDate\">Manzara:</p>\n                                <p class=\"opDate\">").concat(otelTypeTwoName, "</p>\n                              </div>\n                              <div class=\"userOtelsBox7\" id=\"box7\">\n                                <p class=\"texts\">Oda Fiyat\u0131</p>\n                                <p class=\"price\">").concat(otelPriceText, " TL</p>\n                                <p class=\"texts\">Fiyat Etki Oran\u0131</p>\n                                <p class=\"price\">%").concat(otelPriceTwoText, "</p>\n                                <p class=\"texts\">Konaklama (").concat(dayDifference, " G\xFCn)</p>\n                                <p class=\"price\">").concat(sonucTwo, " TL</p>\n                                <p class=\"texts\">\u0130ndirim (CODE ").concat(localStorage.getItem("CouponsPrice"), ")</p>\n                                <p class=\"price\">-").concat(localStorage.getItem("CouponsPrice"), " TL</p>\n                                <hr />\n                                <p class=\"total\">TOPLAM TUTAR</p>\n                                <p class=\"totalPrice\">").concat(sonucTwo - localStorage.getItem("CouponsPrice"), " TL</p>\n                              </div>");
          finishPage.innerHTML = rowEight;
        });
      });
    });

    // Kart Numarasını 4 lü sisteme çevirme **
    var input = document.getElementById("cardNumber");
    input.addEventListener("input", function () {
      return input.value = formatNumber(input.value.replaceAll(" ", ""));
    });
    var formatNumber = function formatNumber(number) {
      return number.split("").reduce(function (seed, next, index) {
        if (index !== 0 && !(index % 4)) seed += " ";
        return seed + next;
      }, "");
    };

    // Kart Numarasının Karta yazılması
    var cardText = document.getElementById("cardText");
    input.addEventListener("change", updateValue);
    function updateValue(e) {
      cardText.textContent = e.target.value;
      localStorage.setItem("CardText", cardText);
    }

    // Kart Sahibinin Adının Karta Yazılması
    var cardNameText = document.getElementById("cardNameText");
    var cardName = document.getElementById("cardName");
    cardNameText.addEventListener("change", updateName);
    function updateName(e) {
      cardName.textContent = e.target.value;
      localStorage.setItem("CardNameText", cardNameText);
    }
  };
  // init function end

  return {
    Init: init
  };
}(jQuery);
$(function () {
  Teknasyon.Main.Init();
});