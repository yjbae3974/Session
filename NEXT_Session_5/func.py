
def is_odd(num) : 
    if(num % 2 == 0):
        return(False)
    else:
        return(True)
    

num = int(input())

if is_odd(num):
    print('odd')
else:
    print('even')
    
