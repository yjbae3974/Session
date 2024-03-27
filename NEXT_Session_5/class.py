

class Person:
    def __init__(self,name,age,height):
        self.name = name
        self.age = age
        self.height = height
    
    def introduce(self):
        print(f'저는 {self.name}이고, 제 나이는 {self.age}입니다.')
    def yell(self):
        print('아?')

class Developer(Person):
    keyboard = "기계식"
    def __init__(self,name,age,height):
        super().__init__(name,age,height)
    def yell(self):
        print('어?')
        
class Designer(Person):
    def __init__(self,name,age,height,disease):
        super().__init__(name,age,height)
        self.disease = disease

class ProductManager(Person):
    def __init__(self,name,age,height):
        super().__init__(name,age,height)
    def yell(self):
        print("개발자님 여기 오류있어요")

d1 = Developer("배연준",25,184)
d2 = Designer("정영헌",24,172,"상사병")
p1 = ProductManager("정재윤",24,184)

d1.introduce()
d1.yell()
d2.introduce()
d2.yell()
p1.introduce()
p1.yell()