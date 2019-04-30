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
print(encryption("It is a type of substitution cipher in which each letter in the plaintext is replaced by a letter some fixed number of positions down the alphabet. For example, with a left shift of 3, D would be replaced by A, E would become B, and so on. The method is named after Julius Caesar, who used it in his private correspondence.",5))
