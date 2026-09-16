import urllib.request
import json
import re

def search_pexels(query):
    url = f"https://www.pexels.com/search/{query.replace(' ', '%20')}/"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        res = urllib.request.urlopen(req)
        html = res.read().decode('utf-8')
        
        # Encontrar imagens do pexels
        images = re.findall(r'src="(https://images\.pexels\.com/photos/\d+/pexels-photo-\d+\.jpeg\?auto=compress&cs=tinysrgb&w=800)"', html)
        
        # Desduplicar preservando a ordem
        unique_images = []
        for img in images:
            if img not in unique_images:
                unique_images.append(img)
                
        print(f"--- Results for {query} ---")
        for i, img in enumerate(unique_images[:5]):
            print(f"{i+1}. {img}")
    except Exception as e:
        print(f"Error: {e}")

search_pexels("luxury perfume")
search_pexels("perfume flatlay")
search_pexels("white flowers aesthetic")
search_pexels("dark wood texture aesthetic")
search_pexels("amber glass bottle aesthetic")
