module Jekyll
  module Take45Filter
    def take45(array)
      array.take(45)
    end
  end
end

Liquid::Template.register_filter(Jekyll::Take45Filter)
