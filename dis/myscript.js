let isscroll=true;
let alldata=[];
let uu=false;
let firstAddition=true;
let t = 0, i = 0, j = 0;
let k=0;
$(window).on('load',  ()=> {
    $('#status').fadeOut();
    $('#preloader').fadeOut(300);
});
$( document ).ready(()=> {
    let cards = document.querySelector('#infinte-list');
    $("#iframeloading").show();
        $("#iframeloading").fadeOut(500);
        addfirst(10,uu);
        $(window).scroll( ()=> {
            let scrollTop = $(document).scrollTop();
            let windowHeight = $(window).height();
            let bodyHeight = $(document).height() - windowHeight;
            let scrollPercentage = (scrollTop / bodyHeight);
            if (scrollPercentage>=0.75&&isscroll) 
            {
                isscroll=false;
                
                 addfirst(5,uu);
                setTimeout(()=> {
                    isscroll=true;
                    
                }, 350);

            }
             
        });
        $('#sort-cards').on('click',  ()=> {
            let list = document.getElementById('infinte-list');

            //remove all cards
            while (list.firstChild) {
                list.removeChild(list.firstChild);
            }
        
            alldata.sort( (a, b)=> {
         return compareStringsASC(a.name.first, b.name.first);
            });
            i = 0;
            j = 0;
            t = 0;
            uu=true;
            isscroll=false;
            addfirst(alldata.length,uu);
        
        });
        
        $('#sort-date').on('click',  ()=> {
            let list = document.getElementById('infinte-list');
            while (list.firstChild) {
                list.removeChild(list.firstChild);
            }
            alldata.sort((a, b)=> {
             return compareStringsDESC(a.name.first, b.name.first);
            });
            i = 0;
            j = 0;
            t = 0;
            uu=true;
            isscroll=false;
            addfirst(alldata.length,uu);
        });
        
        
});

var addfirst = (numm,uu)=>{
    $.getJSON("https://randomuser.me/api/?results="+numm+"&nat=us",(data)=>{
        // itemss=data.results;
        let firstName,lastName,fullname,pic;
        let item;
        let idd,hint,index,newStr;
        let editcard ,x;
        let fname, lname, fulname, tittle;
        let gg ;
        let textval;
        if(!uu){ 
        for( i;i<data.results.length;i++){
             alldata.push(data.results[i]);
             firstName = data.results[i].name.first;
             lastName = data.results[i].name.last;
             fullname = firstName + " " + lastName;
             pic = data.results[i].picture.large;
           
            $('#infinte-list').append('<li><div class="card">' +
            '<div class="person-photo">' +
            '<img src="' + pic + '"' + 'class="image" >' +
            '</div>' +
            '<div class="person-info">' +
            '<p id="key">MY Name</p>' +
            '<P id="value">' + fullname + '</P>' +
            '<br>' +
            '</div>' +
            '<div class="social-media">' +
            '<button class="social-button" id="name' + j + '"' + '><i class="fas fa-user-circle fa-2x"></i></i></button>' +
            '<button class="social-button" id="letter' + j + '"' + '><i class="fas fa-envelope fa-2x"></i></button>' +
            '<button class="social-button" id="location' + j + '"' + '><i class="fas fa-map-marker-alt fa-2x"></i></button>' +
            '<button class="social-button" id="date' + j + '"' + '><i class="far fa-calendar-alt fa-2x"></i></button>' +
            '<button class="social-button" id="pass' + j + '"' + '><i class="fas fa-lock fa-2x"></i></button>' +
            '</div>' +
            '</div></li>');
            j++;

        }
    }
        else{
            i=0;
            for( i;i<alldata.length;i++){
                 firstName = alldata[i].name.first;
                 lastName =  alldata[i].name.last;
                 fullname = firstName + " " + lastName;
                 pic = alldata[i].picture.large;
               
                $('#infinte-list').append('<li><div class="card">' +
                '<div class="person-photo">' +
                '<img src="' + pic + '"' + 'class="image" >' +
                '</div>' +
                '<div class="person-info">' +
                '<p id="key">MY Name</p>' +
                '<P id="value">' + fullname + '</P>' +
                '<br>' +
                '</div>' +
                '<div class="social-media">' +
                '<button class="social-button" id="name' + j + '"' + '><i class="fas fa-user-circle fa-2x"></i></i></button>' +
                '<button class="social-button" id="letter' + j + '"' + '><i class="fas fa-envelope fa-2x"></i></button>' +
                '<button class="social-button" id="location' + j + '"' + '><i class="fas fa-map-marker-alt fa-2x"></i></button>' +
                '<button class="social-button" id="date' + j + '"' + '><i class="far fa-calendar-alt fa-2x"></i></button>' +
                '<button class="social-button" id="pass' + j + '"' + '><i class="fas fa-lock fa-2x"></i></button>' +
                '</div>' +
                '</div></li>');
                j++;
    
            }

        }
    
    i=0;

    
         item = document.querySelectorAll('#infinte-list li button');
        k=0;
        for ( k ; k < item.length; k++) {
                item[k].addEventListener('click', function (event) {
               
                idd = event.target.id;
                hint = "" + this.id;
                let thenum = hint.replace( /^\D+/g, ''); 
                console.log(thenum);
                 index = parseInt(thenum);
                  newStr = hint.replace(/[0-9]/g, '');

                switch (newStr) {
                    case "name": 
                    editcard = this.parentNode.parentNode;
                         x = editcard.querySelector('.person-info');
                       
                        fname = alldata[index].name.first;
                        lname = alldata[index].name.last;
                        fulname = fname + " " + lname;
                        tittle = "My Name";
                         gg = x.querySelector('#key');
                         textval = x.querySelector('#value');
                        gg.innerHTML = tittle;
                        textval.innerHTML = fulname;
                        break;
                    case "letter":
                         editcard = this.parentNode.parentNode;
                         x = editcard.querySelector('.person-info');
                        let email;
                        email = alldata[index].email;
                        tittle = "My Email";
                         gg = x.querySelector('#key');
                         textval = x.querySelector('#value');
                        gg.innerHTML = tittle;
                        textval.innerHTML = email;
                        break;
                    case "location":
                         editcard = this.parentNode.parentNode;
                         x = editcard.querySelector('.person-info');
                        let city;
                        city = alldata[index].location.city;
                        tittle = "City Location";
                         gg = x.querySelector('#key');
                        textval = x.querySelector('#value');
                        gg.innerHTML = tittle;
                        textval.innerHTML = city;
                        break;
                    case "date":
                         editcard = this.parentNode.parentNode;
                         x = editcard.querySelector('.person-info');
                        let datee;
                        datee = alldata[index].dob.date;
                        tittle = "Date";
                         gg = x.querySelector('#key');
                         textval = x.querySelector('#value');
                        gg.innerHTML = tittle;
                        textval.innerHTML = datee;
                        break;
                    case "pass":
                       editcard = this.parentNode.parentNode;
                         x = editcard.querySelector('.person-info');
                        let pass;
                        pass = alldata[index].login.password;
                        tittle = "Password";
                         gg = x.querySelector('#key');
                         textval = x.querySelector('#value');
                        gg.innerHTML = tittle;
                        textval.innerHTML = pass;
                     
                        break;
    
                }
            });
        }
    });
};

var compareStringsASC = (a, b)=> {
    a = a.toLowerCase();
    b = b.toLowerCase();

    return (a < b) ? -1 : (a > b) ? 1 : 0;
};
var compareStringsDESC = (a, b)=> {
    a = a.toLowerCase();
    b = b.toLowerCase();
    return (a < b) ? 1 : (a > b) ? -1 : 0;
};
