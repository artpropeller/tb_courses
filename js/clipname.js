function clipname(clipname,l) {

names_ar = document.getElementsByName('course-name-clip');
	for(var i=0; i<names_ar.length; i++) {
	span_obj = names_ar[i].childNodes[0];
	my_span_width = span_obj.offsetWidth;
	my_span_length = span_obj.innerText.length;
	str_end = my_span_width/4.5;
	span_obj.innerText = span_obj.innerText.substring(0,str_end);
		
	//alert (my_span_length+'FFF'+my_span_width);
	
	//alert (names_ar[i].childNodes[0].offsetWidth);
	//alert(names_ar[i].childNodes[0].innerHTML);
	
	};
	
	}