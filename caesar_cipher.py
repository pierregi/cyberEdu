def encryption(text,key):
	text = text.upper()
	res=[]
	for lettre in text :
		i=ord(lettre)
		i-=65
		if(i>=0 and i<26):
			i=(i+key)%26
		res.append(chr(i+65))
	return "".join(res)

print(encryption("In cryptography, a Caesar cipher, also known as Caesar's cipher, the shift cipher, Caesar's code or Caesar shift, is one of the simplest and most widely known encryption techniques.",15))