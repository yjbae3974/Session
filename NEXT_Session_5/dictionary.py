#profile = {'이름': '배연준', '나이': '25', '학과': '전기전자공학부'}
#profile['전화번호'] = '010-2514-9058'

#print(profile['이름'])

#print(profile.items())

#print(profile.values())

#print(profile.keys())

sentence = "to be or not to be, that is the question"

words = sentence.replace(',','').split()


word_count = {}

count = 0

word_count_2 = {word: count for word in words}  


print(words)
for i in words:
    word_count[f'{i}'] = 0
for i in words:
    if i in word_count:
        word_count[f'{i}'] += 1
print(word_count)


