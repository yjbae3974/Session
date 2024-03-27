from bs4 import BeautifulSoup as bs 
import requests
from datetime import datetime
from openpyxl import Workbook

url ='https://www.melon.com/chart/index.htm'

try:
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
        #컴퓨터가 아니라 나 라는 것을 알려주면 된다!
    }
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        html_text = response.text
        
        soup = bs(response.text, 'html.parser')
        today = datetime.now().strftime('%Y-%m-%d')
        titles = soup.find_all(class_='rank01')
        titles = list(map(lambda x: x.text.strip(), titles))
        #print(titles)
        
        artists = soup.select('.rank02 > a')
        artists = list(map(lambda x: x.text, artists))
        #print(artists)
        cnt = 1
        print(f'{today} 멜론차트!!')
        for i in titles:
            print(f'{cnt} 등: {titles[cnt - 1]} - {artists[cnt - 1]}')
            cnt += 1
        wb = Workbook()
        ws = wb.active
        
        ws.append(['순위','제목','아티스트'])
        
        for i, (titles, artists) in enumerate(zip(titles, artists), start = 1):
            ws.append([i,titles,artists])
        
        filename = f'melon_chart_{today}.xlsx'
        wb.save(filename)
        
    else:
        print(f'Error: HTTP 요청 실패. 상태 코드: {response.status_code}')
        
except requests.exceptions.RequestException as e:
    print(f"Error: 요청 중 오류 발생. 오류 메세지: {e}")