from django.shortcuts import render

def hello(request):
    return render(request, 'hello.html')
def count(request):
    return render(request, 'count.html')
def result(request):
    text=request.POST['text'] #textarea의 name을 받아서 보냄!
    without_blank = text.replace(' ','')
    noblank_len = len(without_blank)
    total_len = len(text) 
    return render(request,'result.html',{'total_len': total_len, 'text': text, 'noblank': noblank_len})
# Create your views here.
