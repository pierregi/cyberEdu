#!/usr/bin/python
import re
# CAESAR
def encryptionCaesar(text,key):
	text = text.upper()
	res=[]
	for lettre in text :
		i=ord(lettre)
		i-=65
		if(i>=0 and i<26):
			i=(i+key)%26
		res.append(chr(i+65))
	return "".join(res)

print("##### Caesar #####")


# A Fairy Song by William Shakespeare
print("\n# A Fairy Song by William Shakespeare")
print("cipher\n key: 15\n")

tab1 = ["Over hill, over dale, ",
"Thorough bush, thorough brier, ",
"Over park, over pale, ",
"Thorough flood, thorough fire! ",
"I do wander everywhere, ",
"Swifter than the moon's sphere; ",
"And I serve the Fairy Queen, ",
"To dew her orbs upon the green; ",
"The cowslips tall her pensioners be; ",
"In their gold coats spots you see; ",
"Those be rubies, fairy favours; ",
"In those freckles live their savours; ",
"I must go seek some dewdrops here, ",
"And hang a pearl in every cowslip's ear. "]

res1=""
for ligne in tab1:
  res1+=encryptionCaesar(ligne,15)

print("Text :\n"+"<br/>".join(tab1)+"\n")
print("Answer :\n"+re.sub("\W","",res1)+"\n")

# Aubade by William Shakespeare
print("\n# Aubade by William Shakespeare")
print("decipher key\n key: 5\n")

tab2 = ["HARK! hark! the lark at heaven's gate sings,",
        "And Phoebus 'gins arise,",
        "His steeds to water at those springs",
        "On chaliced flowers that lies;",
        "And winking Mary-buds begin",
        "To ope their golden eyes:",
        "With everything that pretty bin,",
        "My lady sweet, arise!",
        "Arise, arise!",
        "",
        "Aubade, William Shakespeare"]

res2=""
for ligne in tab2:
  res2+=encryptionCaesar(ligne,5)+'<br/>'

print("Text :\n"+res2+"\n")
print("Answer :\n"+re.sub("\W","","".join(tab2).upper())+"\n")

# Unobtainable by Hugo Williams
print("\n# Unobtainable by Hugo Williams")
print("decipher no key\n key: 9\n")

tab3= ["Whether it was putting in an extra beat,",
"or leaving one out, I couldn't tell.",
"My heart seemed to have forgotten",
"everything it ever knew",
"about timing and co-ordination",
"in its efforts to get through to someone",
"on the other side of a wall.",
"As I lay in bed, I could hear it",
"hammering away inside my pillow,",
"being answered now and then",
"by a distant guitar-note of bedsprings,",
"pausing for a moment, as if listening,",
"Then hurrying on as before. ",
"",
"Unobtainable, Hugo Williams"]

res3=""
for ligne in tab3:
  res3+=encryptionCaesar(ligne,9)+'<br/>'

print("Text :\n"+res3+"\n")
print("Answer :\n"+re.sub("\W","","".join(tab3).upper())+"\n")

# VIGENERE 
print("\n\n##### Vigenere #####")

def encryptionVigenere(text,key,a):
  text = text.upper()
  key = key.upper()
  res = []
  tabKey = []
  for lettre in key:
    tabKey.append(ord(lettre)-65)
  j=a
  for i in range(len(text)) :
    letterCode=ord(text[i])
    letterCode-=65
    if(letterCode>=0 and letterCode<26):
      letterCode=(letterCode+tabKey[j%len(tabKey)])%26
      j+=1
    res.append(chr(letterCode+65))
  return ("".join(res),j)

#On My First Son by Ben Jonson
print("\n#On My First Son by Ben Jonson")
print("cipher\n key: 'VIGENERECIPHER'\n")

tab4 = ["Farewell, thou child of my right hand, and joy;",
"My sin was too much hope of thee, loved boy.",
"Seven years thou wert lent to me, and I thee pay,",
"Exacted by thy fate, on the just day.",
"",
"Oh, could I lose all father now! For why",
"Will man lament the state he should envy?",
"To have so soon 'scaped world's and flesh's rage,",
"And if no other misery, yet age!",
"",
"Rest in soft peace, and asked, say, Here doth lie",
"Ben Jonson his best piece of poetry.",
"For whose sake henceforth all his vows be such",
"As what he loves may never like too much."]

res4=""
b=0
for ligne in tab4:
  (a,b)=encryptionVigenere(ligne,"VIGENERECIPHER",b)
  res4+=a
print("Text :\n"+"<br/>".join(tab4)+"\n")
print("Answer :\n"+re.sub("\W","",res4)+"\n")

# A Good Knight In Prison by William Morris
print("\n# A Good Knight In Prison by William Morris")
print("decipher key\n key: 'YOUBETTERDECRYPTME'\n")

tab5 = ["Wearily, drearily,",
"Half the day long,",
"Flap the great banners",
"High over the stone;",
"Strangely and eerily",
"Sounds the wind's song,",
"Bending the banner-poles.",
"",
"While, all alone,",
"Watching the loophole's spark,",
"Lie I, with life all dark,",
"Feet tether'd, hands fetter'd",
"Fast to the stone,",
"The grim walls, square-letter'd",
"With prison'd men's groan.",
"",
"Still strain the banner-poles",
"Through the wind's song,",
"Westward the banner rolls",
"Over my wrong.",
"",
"A Good Knight In Prison, William Morris"]

res5=""
b=0
for ligne in tab5:
  (a,b)=encryptionVigenere(ligne,"YOUBETTERDECRYPTME",b)
  res5+=a+'<br/>'

print("Text :\n"+res5+"\n")
print("Answer :\n"+re.sub("\W","","".join(tab5).upper())+"\n")

# Silvia by William Shakespeare
print("\n# Silvia by William Shakespeare")
print("decipher no key\n key: 'MYKEY'\n")

tab6 = ["WHO is Silvia? What is she?",
"That all our swains commend her?",
"Holy, fair, and wise is she;",
"The heaven such grace did lend her,",
"That she might admired be.",
"",
"Is she kind as she is fair?",
"For beauty lives with kindness:",
"Love doth to her eyes repair,",
"To help him of his blindness;",
"And, being help'd, inhabits there.",
"",
"Then to Silvia let us sing,",
"That Silvia is excelling;",
"She excels each mortal thing",
"Upon the dull earth dwelling:",
"To her let us garlands bring. ",
"",
"Silvia, William Shakespeare"]

res6=""
b=0
for ligne in tab6:
  (a,b)=encryptionVigenere(ligne,"MYKEY",b)
  res6+=a+'<br/>'

print("Text :\n"+res6+"\n")
print("Answer :\n"+re.sub("\W","","".join(tab6).upper())+"\n")
