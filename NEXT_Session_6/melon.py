from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
from datetime import datetime
import csv


chromedriver_path = '/Users/baeyeonjun/Desktop/NEXT/Session/NEXT_Session_6/chromedriver-mac-arm64/chromedriver'

user_data_dir = '/Users/baeyeonjun/Desktop/NEXT/Session/NEXT_Session_6/cash'

chrome_options = Options()
chrome_options.add_argument(f'user-data-dir={user_data_dir}')
service = Service(executable_path=chromedriver_path)

driver = webdriver.Chrome(service=service, options=chrome_options)

driver.get('https://www.melon.com/index.htm')

chartbtn = driver.find_element(By.XPATH, '//*[@id="gnb_menu"]/ul[1]/li[1]/a/span[2]')
scrl_once = driver.find_element(By.TAG_NAME, 'body').send_keys(Keys.PAGE_DOWN)
scrl_end = driver.execute_script("window.scrollTo(0, document.body.scrollHeight)")
chartbtn.click()
scrl_once
scrl_end

time.sleep(3)
#first_main = driver.find_element(By.XPATH, '//*[@id="conts"]/div[6]/div/ul/li[1]/div/ul/li[1]/div[2]/div[2]/p/a')
#second_main = driver.find_element(By.XPATH, '//*[@id="conts"]/div[6]/div/ul/li[1]/div/ul/li[2]/div[2]/div[2]/p/a')
# for i in range(20):
#     print(driver.find_element(By.CSS_SELECTOR, f'tbody > #lst50:nth-child({i + 1}) > td:nth-child(6) > div > div > div.ellipsis.rank01 > span > a').text)
# #first = driver.find_element(By.CSS_SELECTOR, 'tbody > #lst50:first-child > td:nth-child(6) > div > div > div.ellipsis.rank01 > span > a')
# #second = driver.find_element(By.CSS_SELECTOR, 'tbody > #lst50:nth-child(2) > td:nth-child(6) > div > div > div.ellipsis.rank01 > span > a')

# print(first.text)
# print(second.text)
today = datetime.now().strftime('%Y%m%d')
file = open(f'{today}melon.csv', mode = 'w', newline='')
writer = csv.writer(file)
writer.writerow(["rank","title","singer"])

infos = driver.find_elements(By.XPATH, '//*[@id="lst50"]')
for i, info in enumerate(infos, start = 1):
    rank = i
    title = info.find_element(By.XPATH, f'/html/body/div/div[3]/div/div/div[3]/form/div/table/tbody/tr[{i}]/td[6]/div/div/div[1]/span/a').text
    singer = info.find_element(By.XPATH, f'/html/body/div/div[3]/div/div/div[3]/form/div/table/tbody/tr[{i}]/td[6]/div/div/div[2]/a').text
    # print(rank, title, singer)
    writer.writerow([rank,title,singer])

file.close()


